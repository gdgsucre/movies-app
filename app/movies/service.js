var model = require('./model.js')
var MongoRepo = require('../utils/mongoRepo')
var storage = require('../utils/fileRepo')
var repo = new MongoRepo(model)

// console.log(upload)

var service = {
  getAll: function () {
    return repo.getAll()
  },
  getOne: function (id) {
    return repo.getOne(id)
  },
  add: function (task) {
    let _task = task.body
    // Guardamos el url de la imagen en el campo image para guardarlo en la base de datos
    _task.image = task.protocol + '://' + task.get('host') + '/' + task.file.path
    return repo.add(_task)
  },
  update: function (id, task) {
    return this.getOne(id).then(() => {
      return repo.update(id, task)
    })
  },
  remove: function (id) {
    return this.getOne(id).then(() => {
      return repo.remove(id)
    })
  }
}

module.exports = service
