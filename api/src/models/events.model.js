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

    eType: { type: String, enum: ['goal', 'redCard', 'yellowCard', 'MOTM'], required: true },
    league: { type: Schema.Types.ObjectId, refPath: 'users' , required: true },
    match: { type: Schema.Types.ObjectId, refPath: 'matches' , required: true },
    team: { type: Schema.Types.ObjectId, refPath: 'teams' },
    player: { type: Schema.Types.ObjectId, refPath: 'players' },
    time: { type: Number, required: true, default: 0 }
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
