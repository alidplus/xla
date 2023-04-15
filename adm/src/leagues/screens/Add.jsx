import { schema, options } from '@xla/schemas/src/league'
import Form from './Form'
import Card from './Card'
import withCommonAddScreen from 'lib/withCommonAddScreen'

export default withCommonAddScreen(Card, Form, schema, options, 'league')
