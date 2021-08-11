import React from 'react'
import PropTypes from 'prop-types'
import { Card} from 'atoms'
import './Card.module.scss'

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

const NoticeCard = ({ data }) => {
  if (!data) return null
  return (
    <Card body className="justify-content-center align-items-center">
      <div>
        <img src="./AMP_0081.JPG" className="w-100" />
        <h1 className="h5 my-2">تیم خیارشور تغیرنام  پیدا کرد</h1>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            جمعه28تیر1398 , 18:55
          </small>
          <small className="text-info">
            بازدید : 1200
          </small>
        </div>
          <p className="bg-dark p-2">تیم خیارشور از این به بعد با نام ذرت سازان فعالیت خواهد کرد دیشدیری دیرین ماشالا</p>
        <p>
        به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد 
        </p>
      </div>
    </Card>
  )
}

NoticeCard.propTypes = {
  data: PropTypes.object
}

export default NoticeCard