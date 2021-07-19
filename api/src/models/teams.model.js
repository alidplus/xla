// teams-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'teams';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    title: {
      fa: {type: String, required: true },
      en: {type: String },
      abr: {type: String }
    },

    owner: { type: Schema.Types.ObjectId, required: true, ref: 'users', autopopulate: true },
    // players: [{ type: Schema.Types.ObjectId, ref: 'players', autopopulate: true }],
    sponsor: { type: Schema.Types.ObjectId, ref: 'sponsors', autopopulate: true }
  }, {
    modelName,
    strict: true,
    timestamps: true
  });

  schema.index(
    {
      "title.fa": 'text',
      "title.en": 'text',
      "title.abr": 'text'
    },
    {
      name: "titleIndex", 
    });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
