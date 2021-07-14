import React, { useEffect, useMemo, useState } from 'react'
import { refereesDuck } from 'store/services'
import { connect } from 'react-redux';
import RefereeForm from 'src/referees/screens/Form'
import RefereeCard from 'src/referees/screens/Card'
import {Row, Col, Button, ModalHeader, ModalBody, ModalFooter} from "atoms";
import {useHash} from "layout/HashRoutes";
import {useRouter} from "next/router";

function Control ({ children, dismiss, data, get, save, remove, closeBtn, toggleFullBtn, id }) {
  const hash = useHash()
  const [errorMessage, setError] = useState(null)
  useEffect (() => {
    if (id && (!data || data._id !== id))
      get(id)
  }, [id])

  const handleSubmit = async (edited, e) => {
    console.log('handleSubmit', id, edited)
    if (!id) {
      let saved = await save(null, edited)
      const { value } = saved
      hash.push('/referees/edit/' + value._id)
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
    return React.cloneElement(children, { handleSubmit, handleRemove, handleError, id, data, errorMessage, dismiss, closeBtn, toggleFullBtn, hash })
  }, [toggleFullBtn])
}

const mapStateToProps = (state, { id }) => {
  return { data: refereesDuck.selectors.get(state, { id }) }
}

const mapActionsToProps = {
  get: refereesDuck.creators.get,
  save: refereesDuck.creators.save,
  remove: refereesDuck.creators.remove,
}

export default connect(mapStateToProps, mapActionsToProps)(Control)
