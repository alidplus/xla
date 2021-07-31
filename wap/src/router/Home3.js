import React, { useEffect, useState } from 'react'
export default function Home({ subscribeTopNav }) {
  const [c, count] = useState(0)

  useEffect(() => {
    subscribeTopNav([
      {
        id: 'fa-cogs',
        icon: <i className="fa fa-cogs"></i>,
        onClick: () => {
          alert('cogsClicked')
        }
      },
      {
        id: 'fa-search',
        icon: <i className="fa fa-search"></i>,
        onClick: () => {
          alert('fa-search')
        }
      }
    ])
  }, [])

  return <div>
    <h2>Home 333 with user</h2>
    <button onClick={e => { count(c + 1) }}>add</button>
    <p>{c}</p>
  </div>;
}
