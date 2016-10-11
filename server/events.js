const { SERVER_QUEUE, SERVER_PLAY } = require('./constants')

function serverQueue(id, board, collection, sound) {
  return {
    event: SERVER_QUEUE,
    data: { id, board, collection, sound }
  }
}

function serverPlay(id, board, collection, sound) {
  return {
    event: SERVER_PLAY,
    data: { id, board, collection, sound }
  }
}

module.exports = { serverQueue, serverPlay }
