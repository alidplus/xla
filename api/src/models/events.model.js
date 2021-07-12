// events-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'events';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    variety: { type: String, default: 'log', required: true },
    payload: Schema.Types.Mixed,

    target: { type: Schema.Types.ObjectId, refPath: 'model' },
    model: { type: String, enum: ['users', 'leagues', 'teams', 'referees', 'sponsors', 'players', 'matches', 'events'] },
  }, {
    timestamps: true
  });
  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true});

  schema.virtual('__model').get(() => modelName);


  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
