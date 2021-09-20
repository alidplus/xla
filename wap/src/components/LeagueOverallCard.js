<<<<<<< HEAD
import React, { useMemo } from 'react'
import {Card, CardHeader, CardBody, CardTitle} from "reactstrap";
=======
import React from 'react'
import {Card, CardHeader, CardBody, CardTitle, CardImg} from "reactstrap";
>>>>>>> 868ebcb7b9d6b2a8f67025c7361881781b381e79

const LeagueOverallCard = ({ data = {} }) => {

  const leagueStatistics = useMemo(() => {
      return data.sampleLeagueTeams.reduce((result, team) => {
        result.gf += team.statistics?.gf ?? 0 
        result.rc += team.statistics?.rc ?? 0 
        result.yc += team.statistics?.yc ?? 0
        return result
      }, {
        gf: 0,
        rc: 0,
        yc: 0
      });
  }, [data])

  return (
<<<<<<< HEAD
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">
          <h1 className="h5 mb-0">{data.sampleLeague.title} <small className="text-muted">میانه</small></h1>
        </CardTitle>
      </CardHeader>
      <CardBody className="text-center">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <div>
            <div>1</div>
            <div className="text-danger">سطح لیگ</div>
          </div>
          <div>
            <div>{data.sampleLeague.teams}</div>
            <div>تعداد تیم</div>
          </div>
          <div>
            <div>{data.sampleLeague.teams - 1}</div>
            <div>تعداد هفته</div>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center pt-3">
          <div>
            <div>-</div>
            <div className="text-danger">برد میزبان</div>
          </div>
          <div>
            <div>-</div>
            <div className="text-danger">مساوی</div>
          </div>
          <div>
            <div>-</div>
            <div className="text-danger">برد میهمان</div>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center pt-3">
          <div>
            <div>گل</div>
            <div>{leagueStatistics?.gf}</div>
          </div>
          <div>
            <div>کارت قرمز</div>
            <div>{leagueStatistics?.rc}</div>
          </div>
          <div>
            <div>کارت زرد</div>
            <div>{leagueStatistics?.yc}</div>
          </div>
        </div>
      </CardBody>
    </Card>
=======
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <img src="/trophy.gif" className="w-100 my-n5"/>
      </div>
      <Card className="mb-2">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <CardTitle className="mb-0">
            <h1 className="h5 mb-0">{data.title} <small className="text-muted">میانه</small></h1>
          </CardTitle>
          <i className="fa fa-ellipsis-v"/>
        </CardHeader>
        <CardBody className="text-center">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <div>
              <div>1</div>
              <div>سطح لیگ</div>
            </div>
            <div>
              <div>10</div>
              <div>تعداد تیم</div>
            </div>
            <div>
              <div>9</div>
              <div>تعداد هفته</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center pt-3">
            <div>
              <div>-</div>
              <div>برد میزبان</div>
            </div>
            <div>
              <div>-</div>
              <div>مساوی</div>
            </div>
            <div>
              <div>-</div>
              <div>برد میهمان</div>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center pt-3">
            <div>
              <div>گل</div>
              <div>-</div>
            </div>
            <div>
              <div>کارت قرمز</div>
              <div>-</div>
            </div>
            <div>
              <div>کارت زرد</div>
              <div>-</div>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
>>>>>>> 868ebcb7b9d6b2a8f67025c7361881781b381e79
  )
}

export default LeagueOverallCard
