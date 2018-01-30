var statusCodes = require('./statusCodes')

function checkExists (obj) {
  if (!obj) {
    throw {
      statusCode: statusCodes.NOT_FOUND
    }
  }
  return obj
}

function checkContent (obj) {
  if (obj.length == 0) {
    throw {
      statusCode: statusCodes.NO_CONTENT
    }
  }
  return obj
}

class Repo {
  constructor (model) {
    this.model = model
  }
  add (object) {
    let newObject = new this.model(object)
    return newObject.save().then(obj => obj.toObject())
  }
  getAll () {
    return this.model.find({}).lean().exec().then(checkContent)
  }
  getOne (id) {
    return this.model.findById(id).lean().exec().then(checkExists)
  }
  update (id, object) {
    let opt = {'new': true}
    return this.model.findByIdAndUpdate(id, object, opt).lean().exec()
  }
  remove (id) {
    return this.model.findByIdAndRemove(id).lean().exec()
  }
}

module.exports = Repo
