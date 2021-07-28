import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import moment from 'moment-jalaali'
import fa from "moment/locale/fa";
import MatchesListCard from '../components/MatchesListCard'
import {Container, Button, TabContent, TabPane } from "reactstrap";
import '../assets/scss/scrollbars.scss';

moment.locale("fa", fa);
moment.loadPersian({
  usePersianDigits: true,
  dialect: 'persian-modern'
})

const daysMap = {
  '-1': 'دیروز',
  '0': 'امروز',
  '1': 'فردا'
}

const startDate = moment().subtract(4, 'days')
const tabs = (new Array(10)).fill(0).map((_, i) => i - 4)
  .map(n => {
    const day = startDate.clone().add(n, 'days')
    const absDiff = Math.abs(n)
    return {
      n,
      absDiff,
      day,
      label: absDiff > 1 ? day.format('dddd jDo jMMMM') : daysMap[n]
    }
  })

export default function Home({ subscribeTopNav }) {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(subscribeTopNav.bind({}, []), [])
  useEffect(() => {
    const el = document.getElementById(`tab-id-${activeTab}`)
    if (el)
      process.nextTick(() => {
        window.requestAnimationFrame(() => {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        });
      })
  }, [activeTab])

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <>
      <div className="bg-dark border-0 position-absolute w-100 z-index-10 pt-1 mt-n1 shadow">
        <div className="w-100 overflow-x-scroll scroll-less d-flex justify-content-between text-nowrap">
          {tabs.map((a, i) => (
            <Button
              key={a.n}
              id={`tab-id-${a.n}`}
              size="sm"
              color={activeTab === a.n ? 'flat-primary' : 'flat-secondary'}
              className={classnames("shadow-none me-1 rounded-0 border-top-0 border-start-0 border-end-0", {
                'border-info text-info border-bottom': activeTab === a.n,
                'px-3': a.absDiff > 1,
                'px-4': a.absDiff <= 1,
              })}
              onClick={toggle.bind({}, a.n)}
            >
              {a.label}
            </Button>
          ))}
        </div>
      </div>
      <Container className="mt-5">
        <TabContent activeTab={activeTab}>
        {tabs.map((a, i) => (
          <TabPane
            key={a.n}
            tabId={a.n}
          >
            <h4>بازی های {a.label}</h4>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
            <MatchesListCard/>
          </TabPane>
        ))}
        </TabContent>
      </Container>
    </>
  );
}
