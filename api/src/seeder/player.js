module.exports = ({team}) => ({
  name: '{{name.firstName}} {{name.lastName}}',
  no: Math.random() * 100 % 100,
  bDate: new Date(),
  team: team._id,
});