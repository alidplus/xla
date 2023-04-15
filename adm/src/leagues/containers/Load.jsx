import React from 'react'
import { leaguesDuck as duck } from 'store/services'
import withCommonLoadContainer from 'lib/withCommonLoadContainer'

export default withCommonLoadContainer(duck)
