import optionsProvider from 'lib/optionsProvider'
import Inline from "../screens/Inline";

export const queryBuilder = (keyword = '') => {
  if (!keyword) return {}
  let rgx = keyword.split(' ').filter(a => a).join('|');
  return {
    '$or': [
      { _id: keyword },
      { sid: keyword },
      { name: {$regex: rgx, $options: 'ig'} }
    ]
  }
}

export default optionsProvider.bind({}, 'leagueTeams', queryBuilder, Inline)

// returns { options, searchProps, paginateProps, selected }
