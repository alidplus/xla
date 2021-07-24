import React,  { useState } from 'react'
import classnames from 'classnames'
import League from '../components/League'
import {Container, Button, TabContent, TabPane } from "reactstrap";

export default function Home() {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <>
      <div className="w-100 overflow-x-scroll">
        <div className="d-flex mb-2">
          {(new Array(12)).fill(0).map((a, i) => (
            <Button
              key={"" + i}
              size="sm"
              color={activeTab === ("" + i) ? 'primary' : 'secondary'}
              className="me-1 px-3 text-nowrap"
              onClick={() => { toggle("" + i); }}
            >
              Tab {i}
            </Button>
          ))}
        </div>
      </div>
      <Container>
        <TabContent activeTab={activeTab}>
        {(new Array(12)).fill(0).map((a, i) => (
          <TabPane
            key={"" + i}
            tabId={"" + i}
          >
            <h4>{i} لیگ های فعال</h4>
            <League/>
            <League/>
            <League/>
          </TabPane>
        ))}
        </TabContent>
      </Container>
    </>
  );
}
