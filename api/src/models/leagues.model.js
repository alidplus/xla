// leagues-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'leagues';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    title: { type: String, required: true },
    text: { type: String },
    teams: { type: Number, default: 0 },
    homeAway: { type: Boolean, default: false },
    results: Schema.Types.Mixed,

    sponsor: { type: Schema.Types.ObjectId, ref: 'sponsors' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'teams' }]
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
