const { SERVER_QUEUE, SERVER_PLAY } = require('./constants')

function serverQueue(id, collection, sound) {
  return [
    SERVER_QUEUE,
    { id, collection, sound }
  ]
}

function serverPlay(id, collection, sound) {
  return [
    SERVER_PLAY,
    { id, collection, sound }
  ]
}

module.exports = { serverQueue, serverPlay }
