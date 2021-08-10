// league-participants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'leagueTeams';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;


  const schema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'teams', autopopulate: true, required: true },
    league: { type: Schema.Types.ObjectId, ref: 'leagues', autopopulate: true, required: true },
    statistics: {
      played: { type: Number, default: 0 },
      points: { type: Number, default: 0 },
      win: { type: Number, default: 0 },
      draw: { type: Number, default: 0 },
      loss: { type: Number, default: 0 },
      gf: { type: Number, default: 0 }, // goal for
      ga: { type: Number, default: 0 }, // goal against
      gd: { type: Number, default: 0 }, // goal difference
      rc: { type: Number, default: 0 }, // red card
      yc: { type: Number, default: 0 }, // yellow card
    }
  }, {
    timestamps: true,
    strict: true,
    modelName,
  });

  schema.virtual('leaguePlayers', {
    ref: 'leaguePlayers',
    localField: '_id',
    foreignField: 'leagueTeam',
    justOne: false,
    autopopulate: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
