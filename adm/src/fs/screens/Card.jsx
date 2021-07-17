import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
import { Card, CardImg, CardImgOverlay, CardTitle, CardText } from 'atoms'
import FsListContainer from 'src/fs/containers/List'
import FsAvatarScreen from 'src/fs/screens/Avatar'

const overlayStyle = {
  background: '#0007'
}

const FCard = ({ data, hash }) => {
  if (!data) return null
  const { model, pathname, target, _id } = data
  const albumQuery = useMemo(() => ({ model, pathname, target, _id: { $ne: _id } }), [model, pathname, target, _id])
  return (
    <Card className="h-100">
      <CardImg className="h-100 object-fit-contain" src={`${process.env.XLA_FS_URL}${data.url}`}/>
      <CardImgOverlay className="d-flex flex-column p-0">
        <div style={overlayStyle} className="p-1">
          <CardTitle tag="h5">{data.fileName}</CardTitle>
          <div>{model}</div>
          <div>{pathname}</div>
          <div><small>{moment(data.createdAt).format('LLLL')}</small></div>
        </div>
        <CardText className="mt-auto">
          <FsListContainer uid={`fs-similar-album-${_id}`} query={albumQuery}>
            {({array}) => {
              return (
                <div className="d-flex justify-content-center">
                  {(array.data || []).map(fs => (
                    <div key={fs._id} onClick={e => hash.push('/fs/view/' + fs._id)}>
                      <FsAvatarScreen circle={false} data={fs}/>
                    </div>
                  ))}
                </div>
              )
            }}
          </FsListContainer>
        </CardText>
      </CardImgOverlay>
    </Card>
  )
}

FCard.propTypes = {
  data: PropTypes.object
}

export default FCard
