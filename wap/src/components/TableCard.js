import React from 'react'
import {Card, CardHeader, CardBody, CardTitle , Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from "reactstrap";
import { useState } from 'react';
import styles from './TableCard.module.css'
import { SmallAvatar } from './Avatar';

const avatarStyle= {
}

const TableCard = ({ defaultView = 'short'}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewType, setViewType] = useState(defaultView)
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Card className="mb-2">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">جدول</CardTitle>
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
        <Table striped size="sm" className={styles.table}>
          <thead>
            <tr>
              <td colSpan="2" className="w-100"></td>
              {viewType==="short" ? (
                <>
                  <td>بازی</td>
                  <td>تفاضل</td>
                  <td>امتیاز</td>
                </>
              ) : null}
              {viewType==="all" ? (
                <>
                  <td>بازی</td>
                  <td>برد</td>
                  <td>مساوی</td>
                  <td>باخت</td>
                  <td>گل‌ها</td>
                  <td>امتیاز</td>
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
            {(['تراختور', 'سپاهان', 'پرسپولیس', 'استقلال', 'تراختور', 'سپاهان', 'پرسپولیس', 'استقلال', 'تراختور', 'سپاهان', 'پرسپولیس', 'استقلال']).map((name, i) => (
              <tr key={i}>
                <th className="px-0">{i + 1}</th>
                <td>
                  <div className="d-flex align-items-center">
                    <SmallAvatar/>
                    <div className="ms-1">{name}</div>
                  </div>
                </td>
                {viewType==="short" ? (
                  <>
                    <td>{~~(Math.random() * 999) % 20}</td>
                    <td>{~~(Math.random() * 999) % 20}</td>
                    <td>{~~(Math.random() * 999) % 20}</td>
                  </>
                ) : null}
                {viewType==="all" ? (
                  <>
                  <td>{~~(Math.random() * 999) % 10}</td>
                  <td>{~~(Math.random() * 999) % 10}</td>
                  <td>{~~(Math.random() * 999) % 10}</td>
                  <td>{~~(Math.random() * 999) % 10}</td>
                  <td>{~~(Math.random() * 999) % 10}:{~~(Math.random() * 999) % 10}</td>
                  <td>{~~(Math.random() * 999) % 10}</td>
                  </>
                ) : null}
                {viewType==="form" ? (
                  <>
                      <td>
                        <div className={styles.formRow}>
                          <span className="badge me-1 bg-light font-monospace">D</span>
                          <span className="badge me-1 bg-light font-monospace">D</span>
                          <span className="badge me-1 bg-success font-monospace">W</span>
                          <span className="badge me-1 bg-light font-monospace">D</span>
                          <span className="badge me-1 bg-danger font-monospace">L</span>
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
