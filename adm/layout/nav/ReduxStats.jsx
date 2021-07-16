import React from 'react'
import ducks from 'store/services'
import {connect} from "react-redux";

const ReduxStats = (props) => {
  return (
    <div>
      {Object.keys(props).filter(model => typeof props[model] === 'number').map(model => (
        <small key={model} className="ms-1">{model}<span>:</span>{props[model]}</small>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  const map = {}
  for (const model of Object.keys(ducks)) {
    map[model] = Object.keys(ducks[model].selectors.collection(state)).length
  }
  return map
}

export default connect(mapStateToProps)(ReduxStats)
