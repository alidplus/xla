const uploadMap = require('../../config/upload-map.json')

module.exports = function fsVirtuals(schema, { autopopulate = false }) {
  const model = schema.options.modelName
  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true});
  if (!model) return
  schema.virtual('__model').get(() => model);
  if (uploadMap.hasOwnProperty(model)) {
    for (const pathname of Object.keys(uploadMap[model])) {
      const count = uploadMap[model][pathname].count
      schema.virtual(pathname, {
        ref: 'fs',
        localField: '_id',
        foreignField: 'target',
        justOne: (count <= 1),
        match: { model, pathname },
        autopopulate
      });
    }
  }
  return schema
};
