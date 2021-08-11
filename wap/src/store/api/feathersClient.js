// Set up feathers client
// You can do this whatever way you prefer, eg. feathers-client
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
// import cookieStorage from './cookieStorage'
const socket = io('', {
  path: '/socket',
  transports:	['websocket']
})

const client = feathers()
client.configure(feathers.socketio(socket, {
  timeout: 80000
}))

client.configure(
  feathers.authentication({
    // storage: cookieStorage
  })
)

client.hooks({
  error: {
    all: [
      (context) => {
        console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.message);
      }
    ]
  }
});

export default client