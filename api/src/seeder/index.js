const userTemplate = require("./user");
const leagueTemplate = require("./league");
const sponsorTemplate = require("./sponsor");
const teamTemplate = require("./team");
const playerTemplate = require("./player");
const matchTemplate = require("./match");
const seederFactory = require("./seedFactory");
const moment = require('moment');
moment().format();

module.exports = async (app) => {
  try {

    const assets = {
      users: [],
      sponsors: [],
      leagues: [],
      teams: [],
      players: [],
      matches: [],
      leagueTeams: [],
      events: [],
    }
    await app.get("mongooseClient").connection.dropDatabase();
    const seeder = seederFactory(app);

    await seeder({
      path: 'users',
      count: 1,
      template: {
        name: "admin",
        email: "admin",
        mobile: "09141234567",
        password: "admin",
      }
    })

    await seeder({
      path: 'sponsors',
      count: 1,
      template: sponsorTemplate({}),
      callback: async (sponsor) => {
        assets.sponsors.push(sponsor)
        await seeder({
          path: 'leagues',
          count: 1,
          template: leagueTemplate({ sponsor }),
          callback: async (league) => {
            assets.leagues.push(league);
          }
        })
      }
    })

    await seeder({
      path: 'users',
      count: 10,
      template: userTemplate({}),
      callback: async (user) => {
        assets.users.push(user)
        await seeder({
          path: "teams",
          template: teamTemplate({ sponsor: assets.sponsors[0], owner: user }),
          callback: async (team) => {
            assets.teams.push(team)
            await seeder({
              path: "players",
              count: 10,
              template: playerTemplate({ team }),
              callback: async (player) => {
                assets.players.push(player);
              }
            })
          }
        })
      }
    });

    await Promise.all(assets.teams.map(async team => {
      await seeder({
        path: 'team/actions',
        count: 1,
        template: {
          action: "joinLeague",
          payload: {
            league: assets.leagues[0]._id,
            team: team._id,
            teamForm: assets.players.filter(player => String(player.team._id) === String(team._id)).reduce((form, player, i) => {
              form[`Pi${i}`] = player._id;
              return form;
            }, {}),
          },
        },
        callback: ({leaguePlayers, leagueTeam}) => {
          leagueTeam.leaguePlayers = leaguePlayers;
          assets.leagueTeams.push(leagueTeam);
        }
      })
    }))

    await seeder({
      path: 'league/actions',
      count: 1,
      template: {
        action: "generateMatch",
        payload: {
          leagueId: assets.leagues[0]._id,
          startTime: moment().subtract(1, "h"),
        },
      },
      callback: async (allMatches) => {
        assets.matches = allMatches;
        const eTypes = ['goal', 'rc', 'yc'];
        const homeOrAway = ['home', 'away'];
        allMatches.forEach(match => {
          for(j = 0; j < 10; j++) {
            const event = {
              eType: eTypes[(~~(Math.random() * 100)) % 3],
              league: assets.leagues[0]._id,
              match: match._id,
              team: homeOrAway[(~~(Math.random() * 100)) % 2],
              time: ~~(Math.random() * 100) % 90,
            };
            const playersLeagueTeam = assets.leagueTeams.find((leagueTeam) => {
              // console.log(">>>>>>>>>leagueTeam.team._id", leagueTeam.team._id);
              // console.log(">>>>>>>>>match[event.team]", match[event.team]._id);
              return String(leagueTeam._id) === String(match[event.team]._id);
            })
            // console.log("assets.leagueTeams", assets.leagueTeams);
            const numOfTP = playersLeagueTeam.leaguePlayers.length;
            event.player = playersLeagueTeam.leaguePlayers[(~~(Math.random() * 100)) % numOfTP]
            // console.log("event.player._id", event.player._id);

            assets.events.push(event);
          }
          const endMatchEvent = {
            eType: "timeUp",
            league: assets.leagues[0]._id,
            match: match._id,
            time: 90,
          };
          assets.events.push(endMatchEvent);
        });
        const EventsService = app.service("events");

        await EventsService.create(assets.events);
        console.log("event Creation Finished");
      }
    })
  } catch (e) {
    console.log(e);
  }

};
