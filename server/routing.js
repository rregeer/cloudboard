const express = require('express')
const path = require('path')

const rootPath = path.join(__dirname, '..')

function routing(app) {
  app.use('/', express.static(path.join(rootPath, 'public')))
  app.use('/sounds', express.static(path.join(rootPath, 'sounds')))
}

module.exports = routing
