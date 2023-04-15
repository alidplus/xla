import React from 'react'
import { teamsDuck as duck } from 'store/services'
import withCommonControlContainer from 'lib/withCommonControlContainer'

const commonControlContainer = withCommonControlContainer(duck)
export default commonControlContainer
