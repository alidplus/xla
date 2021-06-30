import featherDuckGenerator from './featherDuckGenerator'
import services from 'constants/services'

const ducks = {}

services.forEach(servicesName => {
  ducks[servicesName] = featherDuckGenerator(servicesName)
})

services.forEach(servicesName => {
  try {
    const extend = require(`./${servicesName}.extends.js`).default
    if (typeof extend === 'function') ducks[servicesName] = extend(ducks, servicesName)
  } catch (e) {}
})

export default ducks;

