const express = require('express')
const { Server } = require('http')
const socketIo = require('socket.io')

const eventHandler = require('./event-handler')
const routing = require('./routing')

const app = express()
const server = Server(app) // eslint-disable-line new-cap
const port = process.env.PORT || 8011
const io = socketIo(server)

server.listen(port, err => {
  if (err) {
    throw err
  }

  io.on('connection', eventHandler)
  routing(app)

  console.log(`Cloudboard started, listening on port ${port}.`) // eslint-disable-line no-console
})
