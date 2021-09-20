// Set up feathers client
// You can do this whatever way you prefer, eg. feathers-client
import feathers from '@feathersjs/client'
import rest from '@feathersjs/rest-client'
import io from 'socket.io-client'
<<<<<<< HEAD
// import cookieStorage from './cookieStorage'
const socket = io('', {
  path: '/socket',
  // transports:	['websocket']
})
=======
>>>>>>> 868ebcb7b9d6b2a8f67025c7361881781b381e79

const client = feathers()

if (process.env.REACT_APP_TRANSPORT === 'WS') {
  const socket = io('', {
    path: '/socket',
    // transports:	['websocket']
  })
  client.configure(feathers.socketio(socket, {
    timeout: 80000
  }))
} else {
  const restClient = rest(process.env.REACT_APP_XLA_API_URL)
  client.configure(restClient.fetch(window.fetch))
}

// client.configure(
//   feathers.authentication({
//     // storage: cookieStorage
//   })
// )

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
