import optionsProvider from 'lib/optionsProvider'
import Inline from "../screens/Inline";

export const queryBuilder = (keyword = '') => {
  if (!keyword) return {}
  // let query = keyword.split(' ').filter(a => a).join(' ');
  // console.log(query);
  return {
    "$search": keyword
  }
}

export default optionsProvider.bind({}, 'users', queryBuilder, Inline)

// returns { options, searchProps, paginateProps, selected }