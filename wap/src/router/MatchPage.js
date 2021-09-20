import React, { useEffect, useState } from 'react'
export default function MatchPage({ subscribeTopNav }) {
  const [c, count] = useState(0)
  useEffect(() => {
    subscribeTopNav([
      {
        id: 'fa-users',
        icon: <i className="fa fa-users"></i>,
        onClick: () => {
          count(c - 1)
        }
      }
    ])
  }, [c])

  return <div>
    <h2>TeamsLeaderBoard</h2>
    <button onClick={e => { count(c + 1) }}>add</button>
    <p>{c}</p>
  </div>;
}
