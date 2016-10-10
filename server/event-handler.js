const { SERVER_PLAY, SERVER_QUEUE } = require('./constants')

function eventHandler(socket) {
  socket.on(SERVER_QUEUE, onQueue)

  function onQueue({ sound }) {
    socket.emit(SERVER_PLAY, { sound })
  }
}

module.exports = eventHandler
