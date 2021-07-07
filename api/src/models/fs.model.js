// fs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'fs';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    fileName: { type: String, required: true, unique: true, sparse: true },
    extension: { type: String, required: true },
    viewsCount: { type: Number, default: 0 },
    protected: { type: Boolean, default: false },
    thumbnail: { type: String },
    uploadId: { type: String },
    user: { type: String, ref: 'users' },
    original: { type: String, ref: 'fs' },
    meta: Schema.Types.Mixed,

    target: { type: Schema.Types.ObjectId, refPath: 'model', required: true },
    model: { type: String, required: true, enum: ['users', 'leagues', 'teams', 'referees', 'sponsors', 'players', 'matches', 'events'] },
    pathname: { type: String, required: true, enum: ['avatar', 'symbol', 'gallery', 'flag', 'shape', 'logo', 'banner'] }

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
