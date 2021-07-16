import { schema, options } from '@xla/schemas/src/player'
import Form from './Form'
import Card from './Card'
import withCommonAddScreen from 'lib/withCommonAddScreen'

export default withCommonAddScreen(Card, Form, schema, options, 'player')
