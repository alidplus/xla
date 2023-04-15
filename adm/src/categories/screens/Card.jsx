import React from 'react'
import PropTypes from 'prop-types'
import { Card} from 'atoms'

import LoadTeamContainer from 'src/teams/containers/Load'
import LoadLeaguesContainer from 'src/leagues/containers/Load'
import LoadRefereeContainer from 'src/referees/containers/Load'
import LoadSponsorContainer from 'src/sponsors/containers/Load'

import TeamInlineScreen from 'src/teams/screens/Inline'
import LeaguesInlineScreen from 'src/leagues/screens/Inline'
import RefereeInlineScreen from 'src/referees/screens/Inline'
import SponsorInlineScreen from 'src/sponsors/screens/Inline'
import FormattedDate from "components/FormattedDate";
import LoadLeagueTeamContainer from "../../leagueTeams/containers/Load";
import Fsloader from "../../fs/containers/Load";
import Avatar from "../../fs/screens/Avatar";

const Categories = ({ data }) => {
  if (!data) return null
  return (
    <Card body className="justify-content-center align-items-center">
      <div className="d-flex w-100 justify-content-between">
        <span>{data.title}</span>
      </div>
    </Card>
  )
}

Categories.propTypes = {
  data: PropTypes.object
}

export default Categories
