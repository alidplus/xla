import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import LoadTeamContainer from 'src/teams/containers/Load'
import TeamInlineScreen from 'src/teams/screens/Inline'
import classnames from "classnames";

const MatchInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash.push(`/matches/view/${data._id}`)}>
      <Icon className="me-1" />
      <span className="d-inline-flex flex-column align-items-center">
        <span className="d-inline-flex">
          <LoadTeamContainer id={data.home}>
            <TeamInlineScreen abr icon={false}/>
          </LoadTeamContainer>
          <strong className="ms-1">{data.results?.home ?? ''}</strong>
          <span className="px-1">-</span>
          <strong className="me-1">{data.results?.away ?? ''}</strong>
          <LoadTeamContainer id={data.away}>
            <TeamInlineScreen abr icon={false}/>
          </LoadTeamContainer>
        </span>
      </span>
    </span>
  )
}

MatchInline.propTypes = {
  data: PropTypes.object
}

export default MatchInline



