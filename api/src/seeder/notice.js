module.exports = ({category, sponsor, league, leagueTeam, match, leaguePlayer}) => ({
  title: '{{name.firstName}}',
  slug: () => "slg" + ~~(Math.random() * 10000),
  body: '{{lorem.paragraph}}',
  sponsor,
  league,
  leagueTeam,
  match,
  leaguePlayer,
  category,

});