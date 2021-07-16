import React from 'react'
import { playersDuck as duck } from 'store/services'
import withCommonListContainer from 'lib/withCommonListContainer'
import { queryBuilder } from '../hooks/useOptionsProvider'

export default withCommonListContainer(duck, queryBuilder, 'all-players-list')
