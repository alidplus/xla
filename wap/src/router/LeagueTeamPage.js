import React, { useEffect, useState } from 'react'
import {Container} from "reactstrap";
import TeamHeadCard from '../components/TeamHeadCard'
import TeamNextMatchCard from '../components/TeamNextMatchCard'
import TeamFormCard from '../components/TeamFormCard'

export default function LeagueTeamPage({ subscribeTopNav }) {
  return (
    <Container className="mt-1" fluid>
      <TeamHeadCard/>
      <TeamNextMatchCard/>
      <TeamFormCard/>
    </Container>
  );
}
