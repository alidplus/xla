import React from 'react'
import { eventsDuck as duck } from 'store/services'
import withCommonPaginateContainer from 'lib/withCommonPaginateContainer'
import { queryBuilder } from '../hooks/useOptionsProvider'

export default withCommonPaginateContainer(duck, queryBuilder, 'all-events-table')
