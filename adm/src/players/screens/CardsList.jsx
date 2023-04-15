import React from 'react'
import Card from './Card'

const CardsList = ({ array, uid }) => {
  if (!array) return null
  return array.data.map(data => React.createElement(Card, { data }));
}

export default CardsList
