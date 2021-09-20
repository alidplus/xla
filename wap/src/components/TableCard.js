import React, {useEffect, useMemo, useState} from 'react'
import {Card, CardHeader, CardBody, CardTitle , Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from "reactstrap";
import styles from './TableCard.module.css'
import { SmallAvatar } from './Avatar';
import useCommonList from '../lib/useCommonList'
import { TeamProvider, TeamTitle, TeamFlag } from './team/Provider'
import {Link} from "react-router-dom";

const avatarStyle= {
}

const TableCard = ({ defaultView = 'short', league, highlight }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewType, setViewType] = useState(defaultView)
  const toggle = () => setDropdownOpen(prevState => !prevState);


  const useLeageTeamsList = useMemo(() => {
    const leagueId = league._id || league
    const query = { league: leagueId }
    return useCommonList.bind({}, 'leagueTeams', `main-leader-board-team-teams-${leagueId}`, query)
  }, [league])

  const teamLeagues = useLeageTeamsList()
  const teamLeaguesSorted = useMemo(() => {
    return [...teamLeagues].sort((t1, t2) => (t2.statistics?.points ?? 0) - t1.statistics?.points ?? 0)
  }, [teamLeagues])

  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">{league.title}</CardTitle>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle tag="i" className="fa fa-ellipsis-v"/>
          <DropdownMenu>
            <DropdownItem disabled={viewType==="short"} onClick={e => setViewType('short')}>جدول خلاصه</DropdownItem>
            <DropdownItem disabled={viewType==="all"} onClick={e => setViewType('all')}>جدول کامل</DropdownItem>
            <DropdownItem disabled={viewType==="form"} onClick={e => setViewType('form')}>جدول فرم</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </CardHeader>
      <CardBody className="p-1 text-center">
        <Table striped className={styles.table}>
          <thead>
          <tr>
            <td colSpan="2" className="w-100"></td>
            {viewType==="short" ? (
              <>
                <td>G</td>
                <td>GD</td>
                <td>P</td>
              </>
            ) : null}
            {viewType==="all" ? (
              <>
                <td>G</td>
                <td>W</td>
                <td>D</td>
                <td>L</td>
                <td>GD</td>
                <td>P</td>
              </>
            ) : null}
            {viewType==="form" ? (
              <>
                <td className="text-center">بازی های آخر</td>
              </>
            ) : null}
          </tr>
          </thead>
          <tbody>
          {teamLeaguesSorted.map((leagueTeam, i) => (
            <tr key={i} className={leagueTeam._id === highlight ? 'table-dark' : ''}>
              <th className="px-0">{i + 1}</th>
              <td className={leagueTeam._id === highlight ? 'fw-bold' : ''}>
                <Link to={`/league-team/${leagueTeam._id}`} className="text-body text-decoration-none">
                  <TeamProvider id={leagueTeam.team}>
                    <div className="d-flex align-items-center">
                      {/*<SmallAvatar/>*/}
                      <TeamFlag/>
                      <div className="ms-1">
                        <TeamTitle/>
                      </div>
                    </div>
                  </TeamProvider>
                </Link>
              </td>
              {viewType==="short" ? (
                <>
                  <td>{leagueTeam.statistics?.played ?? 0}</td>
                  <td>{leagueTeam.statistics?.gd ?? 0}</td>
                  <td><strong>{leagueTeam.statistics?.points ?? 0}</strong></td>
                </>
              ) : null}
              {viewType==="all" ? (
                <>
                  <td>{leagueTeam.statistics?.played ?? 0}</td>
                  <td>{leagueTeam.statistics?.win ?? 0}</td>
                  <td>{leagueTeam.statistics?.draw ?? 0}</td>
                  <td>{leagueTeam.statistics?.loss ?? 0}</td>
                  <td>
                    <span className="-text-success">{leagueTeam.statistics?.gf ?? 0}</span>
                    <span className="px-1">:</span>
                    <span className="-text-danger">{leagueTeam.statistics?.ga ?? 0}</span>
                  </td>
                  <td><strong>{leagueTeam.statistics?.points ?? 0}</strong></td>
                </>
              ) : null}
              {viewType==="form" ? (
                <>
                  <td>
                    <div className={styles.formRow}>
                      <span className="badge me-1 bg-light font-monospace">D</span>
                      <span className="badge me-1 bg-success font-monospace">W</span>
                      <span className="badge me-1 bg-light font-monospace">D</span>
                      <span className="badge me-1 bg-danger font-monospace">L</span>
                      <span className="pb-0 me-1 border-bottom border-3">
                        <span className="badge bg-light font-monospace">D</span>
                      </span>
                    </div>
                  </td>
                </>
              ) : null}
            </tr>
          ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default TableCard
