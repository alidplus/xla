import React from 'react'
import { fsDuck as duck } from 'store/services'
import withCommonListContainer from 'lib/withCommonListContainer'
import { queryBuilder } from '../hooks/useOptionsProvider'

export default withCommonListContainer(duck, queryBuilder, 'all-fs-list')
