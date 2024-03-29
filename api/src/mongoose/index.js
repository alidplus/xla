const mongoose = require('mongoose');
const autoincrement = require('./autoIncrement');
const logger = require('../logger');
const softDelete = require('mongoose-delete');
const autoPopulate = require('mongoose-autopopulate')
const virtuals = require('./virtuals')
// const namedScopesPlugin = require("mongoose-named-scopes");
// const mongoosePaginate = require('mongoose-paginate-v2)';
// const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2)';

module.exports = function (app) {
  mongoose.connect(
    app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  mongoose.Promise = global.Promise;
  mongoose.plugin(softDelete, { overrideMethods: true,  deletedAt: true });
  mongoose.plugin(autoincrement, {field: 'sid'});
  mongoose.plugin(virtuals, { autopopulate: true });
  mongoose.plugin(autoPopulate);
  app.set('mongooseClient', mongoose);
};
