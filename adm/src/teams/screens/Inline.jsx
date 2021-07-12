import React from 'react'
import PropTypes from 'prop-types'
import { Users } from 'atoms/icons'
import classnames from "classnames";

const TeamInline = ({ data, hash, en, abr, icon = true }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash.push(`/teams/view/${data._id}`)}>
      {icon ? <Users className="me-1"/> : null}
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



