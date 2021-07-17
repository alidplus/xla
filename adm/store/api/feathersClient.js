// Set up feathers client
// You can do this whatever way you prefer, eg. feathers-client
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
// import cookieStorage from './cookieStorage'
const socket = io(process.env.XLA_API_URL)
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
