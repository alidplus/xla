import React from 'react'
import { Button } from 'atoms'
import Router from "next/router";
import authDuck from "store/auth";
import {connect} from "react-redux";

function LogoutBtn ({ logout, children }) {
  async function handleLogout(e) {
    e.preventDefault()
    try {
      await logout()
      Router.push('/')
    } catch (error) {
      console.error('An unexpected error happened:', error)
    }
  }
  return (
    <Button color="danger" onClick={handleLogout}>Logout</Button>
  )
}


const mapStateToProps = (state, props) => {
  return {
    find: authDuck.selectors.authUser(state)
  }
}
const mapActionsToProps = {
  logout: authDuck.creators.logout
}

export default connect(mapStateToProps, mapActionsToProps)(LogoutBtn)
