// league-participants-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'leagueParticipants';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const player = new Schema({
    name: { type: String, required: true },
    no: { type: Number, required: true }
  },
  {
    timestamps: false
  })

  const schema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: 'teams', autopopulate: true },
    league: { type: Schema.Types.ObjectId, ref: 'leagues', autopopulate: true },
    form: {
      gk: player,
      ca: player,
      p1: player,
      p2: player,
      p3: player,
      s1: player,
      s2: player,
      s3: player
    }
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
