import UsersIcon from 'src/users/screens/Icon'
import TeamsIcon from 'src/teams/screens/Icon'
import LeaguesIcon from 'src/leagues/screens/Icon'
import MatchesIcon from 'src/matches/screens/Icon'
import PlayersIcon from 'src/players/screens/Icon'
import EventsIcon from 'src/events/screens/Icon'
import RefereesIcon from 'src/referees/screens/Icon'
import SponsorsIcon from 'src/sponsors/screens/Icon'
import FilesIcon from 'src/fs/screens/Icon'

const navigations = [
  {
    label: 'Users',
    icon: UsersIcon,
    path: '/users'
  },
  {
    label: 'Teams',
    icon: TeamsIcon,
    path: '/teams'
  },
  {
    label: 'Players',
    icon: PlayersIcon,
    path: '/players'
  },
  {
    label: 'Leagues',
    icon: LeaguesIcon,
    path: '/leagues'
  },
  {
    label: 'League Teams',
    icon: TeamsIcon,
    path: '/league-teams'
  },
  {
    label: 'League Players',
    icon: PlayersIcon,
    path: '/league-players'
  },
  {
    label: 'Matches',
    icon: MatchesIcon,
    path: '/matches'
  },
  {
    label: 'Events',
    icon: EventsIcon,
    path: '/events'
  },
  {
    label: 'Referees',
    icon: RefereesIcon,
    path: '/referees'
  },
  {
    label: 'Sponsors',
    icon: SponsorsIcon,
    path: '/sponsors'
  },
  {
    label: 'Files',
    icon: FilesIcon,
    path: '/fs'
  }
]

export default navigations
