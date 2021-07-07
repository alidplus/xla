import React from "react";
import { connect } from 'react-redux';

function Container(props) {
  return (
    <div>
      salam home page
    </div>
  );
}

const mapStateToProps = (state) => ({});
const mapActionsToProps = {}
export default connect(mapStateToProps, mapActionsToProps)(Container)
