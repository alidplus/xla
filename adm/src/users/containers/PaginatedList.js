import React from 'react'
import { usersDuck as duck } from 'store/services'
import withCommonPaginateContainer from 'lib/withCommonPaginateContainer'
import { queryBuilder } from '../hooks/useOptionsProvider'

export default withCommonPaginateContainer(duck, queryBuilder, 'all-users-table')

