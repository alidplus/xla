import React, {useState, useEffect, useMemo} from 'react'
import classnames from 'classnames'
import moment from 'moment-jalaali'
import fa from "moment/locale/fa";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar} from 'react-modern-calendar-datepicker';
import MatchesCalendarDay from './MatchesCalendarDay'

import {Container, Button, TabContent, TabPane, Modal, ModalBody } from "reactstrap";
import '../../assets/scss/scrollbars.scss';

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


export default function Index({ subscribeTopNav }) {
  const [activeTab, setActiveTab] = useState(0);
  const [offset, setOffset] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const tabs = useMemo(() => {
    return (new Array(10)).fill(0).map((_, i) => i - 4)
      .map(n => {
        const day = moment().add(n, 'days')
        const absDiff = Math.abs(n)
        return {
          n,
          absDiff,
          day,
          label: absDiff > 1 ? day.format('dddd jDo jMMMM') : daysMap[n]
        }
      })
  }, [])

  const selectedDay = useMemo(() => {
    const m = moment().add(activeTab, 'day')
    return {
      year: m.jYear(),
      month: m.jMonth() + 1,
      day: m.jDate()
    }
  })
  const setSelectedDay = ({day, month, year}) => {
    const m = moment()
    m.jYear(year)
    m.jMonth(month - 1)
    m.jDate(day)
    const d = m.startOf('jDate').diff(moment().startOf('jDate'))
    const tabIndex = ~~moment.duration(d).asDays()
    if (tabs.map(t => t.n).includes(tabIndex)) {
      setActiveTab(tabIndex)
      setOffset(null)
    }
    else {
      setActiveTab(null)
      const day = moment().add(tabIndex, 'days')
      const absDiff = Math.abs(tabIndex)
      setOffset({
        n: tabIndex,
        absDiff: Math.abs(tabIndex),
        day,
        label: day.format('dddd jDo jMMMM')
      })
    }
    setOpenCalendar(false)
  }

  useEffect(() => {
    subscribeTopNav([
      {
        id: 'fa-calendar-day',
        icon: <i className="fa fa-calendar-day"></i>,
        onClick: () => {
          setOpenCalendar(true)
        }
      }
    ])
  }, [])

  useEffect(() => {
    const el = document.getElementById(`tab-id-${activeTab || 0}`)
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
    if(activeTab !== tab) {
      setActiveTab(tab);
      setOffset(null)
    }
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
      <Container className="mt-5" fluid>
        <TabContent activeTab={activeTab}>
        {tabs.map((a, i) => (
          <TabPane
            key={a.n}
            tabId={a.n}
          >
            <h1 className="h6">بازی های {a.label}</h1>
            <MatchesCalendarDay offset={a.n} />
          </TabPane>
        ))}
        </TabContent>
        {offset && (
          <React.Fragment>
            <h1 className="h6">بازی های {offset.label}</h1>
            <MatchesCalendarDay offset={offset.n} />
          </React.Fragment>
        )}
      </Container>
      <Modal isOpen={openCalendar} unmountOnClose={false} centered toggle={setOpenCalendar.bind({}, false)}>
        <ModalBody className="d-flex justify-content-center">
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            locale="fa"
            shouldHighlightWeekends
          />
        </ModalBody>
      </Modal>
    </>
  );
}
