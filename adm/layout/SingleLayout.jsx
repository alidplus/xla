import React from "react";
import { Container } from "atoms";
import LogoutBtn from "../containers/Logout";
import {Hash} from "./HashRoutes";
import layoutDuck from "../store/layout";
import authDuck from "../store/auth";
import {connect} from "react-redux";

function SingleLayout(props) {
  const { children, authUser } = props;
  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex position-fixed w-100" style={{top:0, left: 0}}>
        {authUser ? <LogoutBtn/> : <Hash to="/login">Login</Hash>}
      </div>
      {children}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  authUser: authDuck.selectors.authUser(state)
});
const mapActionsToProps = {
  logout: authDuck.creators.logout
}
export default connect(mapStateToProps, mapActionsToProps)(SingleLayout)
