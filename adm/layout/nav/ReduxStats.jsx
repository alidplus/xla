import React from 'react'
import ducks from 'store/services'
import {connect} from "react-redux";
import {Badge} from "atoms";

function ReduxStats (props) {
  return <div>
    {Object.keys(props).map(model => (
      <small key={model} className="ms-1">{model}:{props[model]}</small>
    ))}
  </div>
}

const mapStateToProps = state => {
  const map = {}
  for (const model of Object.keys(ducks)) {
    map[model] = Object.keys(ducks[model].selectors.collection(state)).length
  }
  return map
}

export default connect(mapStateToProps)(ReduxStats)
