module.exports = ({sponsor, owner}) => ({
  title: {
    fa: '{{name.title}}',
    en: '{{name.title}}',
    abr: createAbr(),
  },
  owner: String(owner._id),
  sponsor: String(sponsor._id),
});

function createAbr() {
  return String(~~(Math.random() * 1000));
}