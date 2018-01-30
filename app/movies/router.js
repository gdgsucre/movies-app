var express = require('express')
var Service = require('./service.js')
var apiHelper = require('../utils/apiHelper')
var upload = require('../utils/fileRepo')
var path = require('path')

function getAll (req, res) {
  let promise = Service.getAll()
  apiHelper.handle(res, promise)
}

function getOne (req, res) {
  let promise = Service.getOne(req.params.id)
  apiHelper.handle(res, promise)
}

function add (req, res) {
  upload(req, res, function (err) {
    if (err) {
        // Un error ocurrió al subir la imagen
      console.log(err.message)
    }
    let promise = Service.add(req)
    apiHelper.handle(res, promise)
    // Todo sale bien
  })
}

function update (req, res) {
  var id = req.params.id
  let promise = Service.update(id, req.body)
  apiHelper.handle(res, promise)
}

function remove (req, res) {
  var id = req.params.id
  let promise = Service.remove(id)
  apiHelper.handle(res, promise)
}

function getImage (req, res) {
  let name = req.params.name
  res.sendFile(path.resolve('./images/' + name))
}

var router = express.Router()

router.get('/movies', getAll)
router.post('/movies', add)
router.get('/movies/:id', getOne)
router.put('/movies/:id', update)
router.delete('/movies/:id', remove)

router.get('/images/:name', getImage)

module.exports = router
