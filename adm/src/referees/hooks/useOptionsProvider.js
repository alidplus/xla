import optionsProvider from 'lib/optionsProvider'
import Inline from "../screens/Inline";

const queryBuilder = (keyword = '') => {
  let rgx = keyword.split(' ').filter(a => a).join('|');
  return {
    '$or': [
      {name: {$regex: rgx, $options: 'ig'}},
      {email: {$regex: rgx, $options: 'ig'}},
      {mobile: {$regex: rgx, $options: 'ig'}}
    ]
  }
}

export default optionsProvider.bind({}, 'referees', queryBuilder, Inline)

// returns { options, searchProps, paginateProps, selected }
