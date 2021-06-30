import React, { useState } from 'react'
import Form from '../screens/LoginForm'
import authDuck from "store/auth";
import {connect} from "react-redux";

const Login = ({ dismiss, authenticate }) => {

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(body) {
    try {
      await authenticate(body)
      dismiss()
    } catch (error) {
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <div>
      <div className="login">
        <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
Login.Header = () => <span>Login</span>
Login.Footer = () => <span>xLiga</span>
Login.fullScreen = 'sm'

const mapStateToProps = (state, props) => {
  return {
    find: authDuck.selectors.authUser(state)
  }
}
const mapActionsToProps = {
  authenticate: authDuck.creators.authenticate
}

export default connect(mapStateToProps, mapActionsToProps)(Login)
