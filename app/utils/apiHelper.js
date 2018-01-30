var statusCodes = require('./statusCodes')

let helper = {
  response: function (res) {
    return function (json) {
      res.json(json)
    }
  },
  status: (res) => {
    return (e) => {
      switch (e.statusCode) {
        case statusCodes.NOT_FOUND:
          res.status(404)
          res.send(e.message)
          break
        case statusCodes.CONFLICT:
          res.status(409)
          res.send(e.message)
          break
        case statusCodes.NOT_AUTH:
          res.status(401)
          res.send(e.message)
          break
        case statusCodes.NO_CONTENT:
          res.status(204)
          res.send()
          break
        default:
          res.status(500)
          res.send(e.message)
          break
      }
    }
  },
  handle: (res, promise) => promise.then(helper.response(res)).catch(helper.status(res))
}

module.exports = helper
