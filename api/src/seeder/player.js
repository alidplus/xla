const moment = require('moment')

module.exports = ({team}) => ({
  name: '{{name.firstName}} {{name.lastName}}',
  no: () => ~~(Math.random() * 100),
  bDate: () => moment().subtract((18 + Math.random() * 10), 'years').toDate(),
  team: team._id,
});
