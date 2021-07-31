module.exports = ({sponsor, owner}) => ({
  title: {
    fa: '{{name.title}}فارسی ',
    en: '{{name.title}}',
    abr: 'abr' + ~~(Math.random() * 100)
  },
  owner: owner._id,
  sponsor: sponsor._id,
});