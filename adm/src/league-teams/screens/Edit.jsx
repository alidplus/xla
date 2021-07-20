import { schema, options } from '@xla/schemas/src/leagueTeam'
import Form from './Form'
import Card from './Card'
import withCommonEditScreen from 'lib/withCommonEditScreen'

export default withCommonEditScreen(Card, Form, schema, options, 'leagueTeams')
