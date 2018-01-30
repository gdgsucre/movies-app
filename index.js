var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var morgan = require('morgan')
var port = process.env.PORT || 3000

// Mongoose promise constructor
mongoose.Promise = global.Promise

var app = express()

// Para ver el log de las peticiones realizadas por el cliente en consola
app.use(morgan('dev'))

app.use(bodyParser.json())

app.use(function (req, res, next) {
      // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
      // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
      // Pass to next layer of middleware
  next()
})

router(app)

mongoose.connect('mongodb://localhost/movies-dev', {useMongoClient: true})

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port)
})
