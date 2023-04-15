// categories-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'notices';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    title: { type: String, trim: true },
    lead: { type: String, trim: true },
    body: { type: String },
    slug: { type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true },

    sponsor: { type : Schema.Types.ObjectId, ref: 'sponsors' },
    league: { type : Schema.Types.ObjectId, ref: 'leagues' },
    leagueTeam: { type : Schema.Types.ObjectId, ref: 'leagueTeams' },
    match: { type: Schema.Types.ObjectId, ref: 'matches' },
    leaguePlayer: { type: Schema.Types.ObjectId, ref: 'leaguePlayers' },
    referee: { type: Schema.Types.ObjectId, ref: 'referees' },
    category: { type: Schema.Types.ObjectId, ref: 'categories' },

    tags: [{ type: String }],
    // author: { type: Schema.Types.ObjectId, ref: 'User' },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    // published: { type: Boolean, default: true },
    // review: { type: String, default: "pending", enum: ["pending", "confirmed", "rejected"]},
    publishedAt: Date
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
