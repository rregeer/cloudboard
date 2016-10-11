const { serverPlay } = require('./events')
const { SERVER_QUEUE } = require('./constants')

function eventHandler(socket) {
  socket.on(SERVER_QUEUE, onQueue)

  function onQueue({ id, board, collection, sound }) {
    const { event, data } = serverPlay(id, board, collection, sound)

    socket.broadcast.emit(event, data)
    socket.emit(event, data)
  }
}

module.exports = eventHandler
