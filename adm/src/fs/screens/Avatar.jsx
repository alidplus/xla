import React from 'react'



const Avatar = function Avatar({data}) {
    if(!data) return null
    return (
       <img className="rounded-circle img-thumbnail" src={`${process.env.FS_URL}${data.thUrl}`}/>
    )

}

export default Avatar;