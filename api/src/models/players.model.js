const moment = require('moment-jalaali')
// players-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'players';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: {type: Number, unique: true},

    name: { type: String, required: true },
    no: { type: Number, required: true },
    bDate: { type: Date, required: true },

    team: { type: Schema.Types.ObjectId, ref: 'teams', autopopulate: true }
  }, {
    modelName,
    strict: true,
    timestamps: true
  });

  schema.virtual('age').get(function() {
    return this.bDate ? moment(this.bDate).fromNow(true) : '-'
  });

  schema.index(
    {
      name: "text"
    }
  )

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
