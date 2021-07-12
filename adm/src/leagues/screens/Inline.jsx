import React from 'react'
import PropTypes from 'prop-types'
import {useHash} from "../../../layout/HashRoutes";
import {Trophy} from "../../../atoms/icons";

const LeagueInline = ({ data }) => {
  const hash = useHash()
  return !data ? null : (
    <span className="cursor-pointer" onClick={e => hash.push(`/leagues/view/${data._id}`)}>
      <Trophy className="me-1" />
      <span>{data.title}</span>
    </span>
  )
}

LeagueInline.propTypes = {
  data: PropTypes.object
}

export default LeagueInline



