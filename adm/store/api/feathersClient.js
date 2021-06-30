// Set up feathers client
// You can do this whatever way you prefer, eg. feathers-client
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
// import cookieStorage from './cookieStorage'
console.log('process.env.API_URL', process.env.API_URL)
const socket = io(process.env.API_URL)
const client = feathers()
client.configure(feathers.socketio(socket, {
  timeout: 80000
}))

client.configure(
  feathers.authentication({
    // storage: cookieStorage
  })
)

export default client
