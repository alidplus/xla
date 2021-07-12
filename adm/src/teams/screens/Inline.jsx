import React from 'react'
import PropTypes from 'prop-types'
import { Users } from 'atoms/icons'

const TeamInline = ({ data, hash }) => {
  if (!data?.title?.fa) return <pre>{JSON.stringify({data}, null, 2)}</pre>
  return !data ? null : (
    <span className="cursor-pointer" onClick={e => hash.push(`/teams/view/${data._id}`)}>
      <Users className="me-1" />
      <span>{data.title?.fa ?? '!'}</span>
    </span>
  )
}

TeamInline.propTypes = {
  data: PropTypes.object
}

export default TeamInline



