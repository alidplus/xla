import React, { useEffect, useMemo, useState } from 'react'
import {useHash} from "../layout/HashRoutes";
import {connect} from "react-redux";

const CommonControlContainer = function CommonControlContainer ({ children, dismiss, data, get, save, remove, closeBtn, toggleFullBtn, id }) {
  const hash = useHash()
  const [errorMessage, setError] = useState(null)
  useEffect (() => {
    if (id && (!data || data._id !== id))
      get(id)
        .then(data => {
          console.log('found item', id, data)
        }).catch(e => {
          console.log('found item ew', id, e)
        })
  }, [id])

  const handleSubmit = async (edited, e) => {
    if (!id) {
      let saved = await save(null, edited)
      const { value } = saved
      setTimeout(() => {
        hash.push(`/${value.__model}/edit/${value._id}`)
      }, 200)
    }
    else if (id) {
      await save(id, edited)
      dismiss()
    }
  }

  const handleRemove = async (e) => {
    if (id) {
      await remove(id)
      dismiss()
    }
  }

  const handleError = (error, e) => {
    setError(error.message)
  }
  return useMemo(() => {
    return React.cloneElement(children, { handleSubmit, handleRemove, handleError, id, data: (data || {}), errorMessage, dismiss, closeBtn, toggleFullBtn, hash })
  }, [toggleFullBtn, data])
}

const withCommonControlContainer = function withCommonControlContiner (duck, Component = CommonControlContainer) {

  const mapStateToProps = (state, { id }) => {
    return { data: duck.selectors.get(state, { id }) }
  }

  const mapDispatchToProps = {
    get: duck.creators.get,
    save: duck.creators.save,
    remove: duck.creators.remove,
  }

  return connect(mapStateToProps, mapDispatchToProps)(Component)

}

export default withCommonControlContainer
