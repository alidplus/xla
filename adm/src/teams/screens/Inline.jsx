import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import classnames from "classnames";
import Fsloader from "../../fs/containers/Load";
import Avatar from "../../fs/screens/Avatar";
import {Col} from "../../../atoms";

const TeamInline = ({ data, hash, en, abr, icon = true, away }) => {
  if (!data) return null
  const cls = [
    "cursor-pointer d-flex align-items-center",
    {'flex-row-reverse': away },
    {'text-decoration-line-through': data.deleted}
  ]
  return !data ? null : (
    <span className={classnames(cls)} onClick={e => hash?.push(`/teams/view/${data._id}`)}>
      {icon === true ? <Icon className="me-1"/> : null}
      {icon === 'flag' ? (
        <Fsloader id={data.flag}>
          <Avatar size="30px" className="mx-1" />
        </Fsloader>
      ) : null}
      {en && abr && <span>!</span>}
      {en && !abr && <span>{data.title?.en ?? '!'}</span>}
      {!en && abr && <span>{data.title?.abr ?? '!'}</span>}
      {!en && !abr && <span>{data.title?.fa ?? '!'}</span>}
    </span>
  )
}

TeamInline.propTypes = {
  data: PropTypes.object
}

export default TeamInline



