import { schema, options } from '@xla/schemas/src/referee'
import Form from './Form'
import Card from './Card'
import withCommonEditScreen from 'lib/withCommonEditScreen'

export default withCommonEditScreen(Card, Form, schema, options, 'referee')
