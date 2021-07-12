import React from 'react'
import PropTypes from 'prop-types'
import classnames from "classnames";
import {BalanceScale, Star} from "../../../atoms/icons";

const RefereeInline = ({ data, hash }) => {
  return !data ? null : (
    <span className={classnames("cursor-pointer", {'text-decoration-line-through':  data.deleted})} onClick={e => hash.push(`/players/view/${data._id}`)}>
      <BalanceScale className="me-1" />
      <span>{data.name}</span>
      {data.lvl && data.lvl > 0 ? <sup className="ms-1">{data.lvl}</sup> : null}
    </span>
  )
}

RefereeInline.propTypes = {
  data: PropTypes.object
}

export default RefereeInline



