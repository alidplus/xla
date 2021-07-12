import React, { useEffect, useMemo, useState } from 'react'
import { sponsorsDuck } from 'store/services'
import { connect } from 'react-redux';
import SponsorForm from 'src/sponsors/screens/Form'
import SponsorCard from 'src/sponsors/screens/Card'
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
      hash.push('/sponsors/edit/' + value._id)
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
  }, [])
}

const mapStateToProps = (state, { id }) => {
  return { data: sponsorsDuck.selectors.get(state, { id }) }
}

const mapActionsToProps = {
  get: sponsorsDuck.creators.get,
  save: sponsorsDuck.creators.save,
  remove: sponsorsDuck.creators.remove,
}

export default connect(mapStateToProps, mapActionsToProps)(Control)
