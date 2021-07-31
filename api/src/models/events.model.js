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

    eType: { type: String, enum: ['goal', 'rc', 'yc', 'timeUp'], required: true },
    league: { type: Schema.Types.ObjectId, ref: 'users' , required: true },
    match: { type: Schema.Types.ObjectId, ref: 'matches' , required: true },
    team: { type: String, enum:['home', 'away']},
    player: { type: Schema.Types.ObjectId, ref: 'players' },
    time: { type: Number, required: true, default: 0 },

    isChecked: { type: Boolean, default: false },
  }, {
    modelName,
    strict: true,
    timestamps: true
  });


  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
