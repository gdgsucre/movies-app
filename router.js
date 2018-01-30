var express = require('express')
var path = require('path')

function register (app) {
  app.use('/', require('./app/movies/router.js'))
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, 'client')))
  app.get('/*', (req, res) => {
    res.redirect('/')
  })
}

module.exports = register
