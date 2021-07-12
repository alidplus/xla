// matches-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'matches';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    time: { type: Date, required: true },
    results: Schema.Types.Mixed,

    home: { type: Schema.Types.ObjectId, ref: 'teams' },
    homeCp: Schema.Types.Mixed,
    away: { type: Schema.Types.ObjectId, ref: 'teams' },
    awayCp: Schema.Types.Mixed,
    league: { type: Schema.Types.ObjectId, ref: 'leagues' },
    referee: { type: Schema.Types.ObjectId, ref: 'referees' },
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
