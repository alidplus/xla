module.exports = ({}) => ({
  title: '{{name.firstName}}',
  slug: () => "slg" + ~~(Math.random() * 10000),
});