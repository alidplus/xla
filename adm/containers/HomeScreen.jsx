import React from "react";
import { connect } from 'react-redux';

function HomeScreen(props) {
  return (
    <div>
      salam home page
    </div>
  );
}

const mapStateToProps = (state) => ({});
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(HomeScreen)
