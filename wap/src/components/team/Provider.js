import React, {useMemo, useContext} from 'react'
import styles from "../Avatar.module.css";
import useCommonGet from '../../lib/useCommonGet'

const Context = React.createContext()
const useTeamGet = useCommonGet.bind({}, 'teams')

export const TeamProvider = ({ id, children }) => {
  const team = useTeamGet(id)
  return useMemo(() => (<Context.Provider value={team}>{children}</Context.Provider>), [team])
}

export const TeamTitle = () => {
  const team = useContext(Context)
  return (
    <span>{team?.title?.fa}</span>
  )
}

export const TeamFlag = () => {
  const team = useContext(Context)
  return (
    <div className={`ratio ratio-1x1 ${styles.smallAvatar}`}>
      <img src="./AMP_0081.JPG" className="rounded-circle d-block"/>
    </div>
    /*<span>{team?.flag}</span>*/
  )
}

