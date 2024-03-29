const { Service } = require('../feathers-mongoose-extended');
const sharp = require('sharp')
const multer = require('multer')
const sizeOf = require('buffer-image-size');
const path = require('path')
const getByDot = require('lodash/get')
const uploadMap = require('../../../config/upload-map.json')
const rimraf = require("rimraf");
const fs = require('fs')
const fsp = fs.promises

exports.Fs = class Fs extends Service {
  constructor(options, app) {
    super(options, app);
    this.app = app
  }
  async remove (id, params) {
    const fsRoot = this.app.get('fsDir')
    const f = await super.remove(id, params)
    const { model, target, pathname, uploadId, fileName, thumbnail } = f
    const thPath = path.join( fsRoot, model, String(target), pathname, uploadId, thumbnail )
    const filePath = path.join( fsRoot, model, String(target), pathname, uploadId, fileName )
    const dirPath = path.join( fsRoot, model, String(target), pathname, uploadId )
    await new Promise((resolve, reject) => {
      rimraf(dirPath, function (a,b,c) { console.log("done", a,b,c); resolve() });
    })
    // await fsp.unlink(filePath)
    // await fsp.unlink(thPath)
    // await fsp.rmdir(dirPath, { force: true, recursive: true, maxRetries: 3, retryDelay: 300 })
    return f
  }
};

const memoryStorage = multer.memoryStorage()
exports.uploadQueueToMemory = multer({ storage: memoryStorage })


exports.uploadQueue = function (app) {
  const fsRoot = app.get('fsDir')
  return async (req, res) => {
    const Service = app.service('fs');
    try {
      const file = req.files.pop()
      if (!file || !req.body || file.fieldname !== req.body.uploadId) return res.status(500).send('missing data')

      const { model, target, pathname, fileName, type, uploadId } = req.body

      const currentUploads = await Service.find({ query: { model, target, pathname, $limit: 0 }})
      const currentUploadsCount = currentUploads.total
      const allowableUploadsCount = getByDot(uploadMap, `${model}.${pathname}.count`, 0)
      if (currentUploadsCount >= allowableUploadsCount) return res.status(403).send('exceeded upload limit')

      const nameSplits = fileName.split('.')
      const extension = nameSplits.pop()
      const distFileName = nameSplits.join('-').toLowerCase() + '.webp'
      const thumbFileName = 'thumb-' + distFileName
      const dirPath = path.join( fsRoot, model, target, pathname, uploadId )
      const filePath = path.join(dirPath, distFileName)
      const thumbPath = path.join(dirPath, thumbFileName)
      await fsp.mkdir(dirPath, { recursive: true })
      const fileWriteStream = fs.createWriteStream(filePath)
      const thumbWriteStream = fs.createWriteStream(thumbPath)
      const { buffer } = file
      let sizes = {}
      try {
        sizes = sizeOf(buffer);
      } catch (e) {
      }
      const { width = 0, height = 0 } = sizes
      const pipeline = sharp(buffer).rotate().resize({
        width: Math.min(width, 800),
        fit: sharp.fit.cover,
        // position: sharp.strategy.entropy
      })

      pipeline.clone().webp().pipe(fileWriteStream)
      pipeline.clone().resize(150, 150, {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      }).webp().pipe(thumbWriteStream)
      const piping1 = new Promise((resolve, reject) => fileWriteStream.on('finish', resolve).on('error', reject));
      const piping2 = new Promise((resolve, reject) => thumbWriteStream.on('finish', resolve).on('error', reject));
      await Promise.all([piping1, piping2]);
      const savedFs = await Service.create({
        fileName: distFileName,
        thumbnail: thumbFileName,
        mimeType: 'image/webp',
        extension: 'webp',
        uploadId,
        target,
        model,
        pathname,
      })
      return res.json(savedFs)
    } catch (e) {
      console.log('eeeeeee', e);
      return res.status(410).send(e.message)
    }
  }
}
