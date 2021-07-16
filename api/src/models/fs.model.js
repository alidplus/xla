// fs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const path = require('path')

module.exports = function (app) {
  const modelName = 'fs';
  const mongooseClient = app.get('mongooseClient');
  const fsRoot = app.get('fsDir')
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    extension: { type: String, required: true },
    // viewsCount: { type: Number, default: 0 },
    // protected: { type: Boolean, default: false },
    thumbnail: { type: String, required: true },
    // user: { type: String, ref: 'users' },
    // original: { type: String, ref: 'fs' },
    // meta: Schema.Types.Mixed,

    uploadId: { type: String, required: true },
    target: { type: Schema.Types.ObjectId, refPath: 'model', required: true },
    model: { type: String, required: true, enum: ['users', 'leagues', 'teams', 'referees', 'sponsors', 'players', 'matches', 'events'] },
    pathname: { type: String, required: true, enum: ['avatar', 'symbol', 'gallery', 'flag', 'shape', 'logo', 'banner'] }
    // NOTE: add new enums to upload-map.json and Fs components propTypes
  }, {
    modelName,
    strict: true,
    timestamps: true
  });


  schema.virtual('url').get(function() {
    const { model, target, pathname, fileName, uploadId } = this
    return `/${path.posix.join(model, String(target), pathname, uploadId, fileName)}`
  });
  schema.virtual('thUrl').get(function() {
    const { model, target, pathname, thumbnail, uploadId } = this
    return `/${path.posix.join(model, String(target), pathname, uploadId, thumbnail)}`
  });

  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true});

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
