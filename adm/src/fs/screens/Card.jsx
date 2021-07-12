import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, CardBody} from 'atoms'
import FormattedDate from 'components/FormattedDate'
import { useHash } from "layout/HashRoutes";

const s1 = {width: '48px'}
const s2 = {background: '#0007'}

const FsCard = ({ data }) => {
  const hash = useHash()
  return (
    <Card>
      <div className="card-img-top ratio ratio-4x3">
        <img src={`${process.env.FS_URL}${data.url}`} className="object-fit-cover"/>
      </div>
      <div className="d-flex align-items-center mt-n5 z-index-10 pe-2" style={s2}>
        <div className="ratio ratio-1x1" style={s1}>
          <img src={`${process.env.FS_URL}${data.thUrl}`} className="img-thumbnail object-fit-cover"/>
        </div>
        <div className="ms-2 text-truncate">
          <h6 className="mb-0">{data.fileName}</h6>
          <small className="text-light"><FormattedDate data={data}/></small>
        </div>
      </div>
      <CardBody className="p-1">
        <div className="d-flex justify-content-between">
          <span>{data.model}</span>
          <Button color="link" className="stretched-link" onClick={e => hash.push(`/${data.model}/view/${data.target}`)}></Button>
          <span>{data.pathname}</span>
        </div>
      </CardBody>
    </Card>
  )
}

FsCard.propTypes = {
  data: PropTypes.object
}
export default FsCard

