module.exports = ({sponsor}) => ({
  title: '{{commerce.productName}}',
  description: '{{lorem.text}}',
  teams: 10,
  homeAway: false,
  sponsor: String(sponsor._id),
});