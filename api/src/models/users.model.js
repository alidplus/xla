// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    sid: { type: Number, unique: true },

    name: String,
    email: { type: String, unique: true, lowercase: true },
    mobile: { type: String, lowercase: true },
    password: { type: String },

    // googleId: { type: String },
    // facebookId: { type: String },

    // lastSeenAt: Date,
    // isActive: { type: Boolean, default: true },

    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date }, // or a long integer
    verifyChanges: {},
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date }, // or a long integer
  }, {
    modelName,
    strict: true,
    timestamps: true
  });


  schema.index(
    {
      name: 'text'
    }/*,
    {
      name: "myindex", 
      weights: {
        name: 2
      }
    }*/);

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
