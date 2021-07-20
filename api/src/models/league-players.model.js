// league-participants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'leaguePlayers';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;


  const schema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'teams' },
    league: { type: Schema.Types.ObjectId, ref: 'leagues' },
    leagueTeam: { type: Schema.Types.ObjectId, ref: 'leagueTeams' },
    player: { type: Schema.Types.ObjectId, ref: 'players' },
    name: { type: String, required: true },
    no: { type: Number, required: true },
    statistics: { 
      played: { type: Number, default: 0 },
      goal: { type: Number, default: 0 },
      assist: { type: Number, default: 0 },
      rc: { type: Number, default: 0 }, // red card
      yc: { type: Number, default: 0 }, // yellow card
    },
  }, {
    timestamps: true,
    modelName,
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
