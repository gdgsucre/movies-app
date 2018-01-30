var mongoose = require('mongoose')

var schemaMovies = mongoose.Schema({
  title: String,
  production: String,
  movie_script: [String],
  music: [String],
  actors: [String],
  punctuation: Number,
  comments: [{
    user: String,
    avatar: String,
    comment: String,
    comment_date: Date
  }],
  year: Number,
  genre: String,
  image: String
}, {
  // internal revision of the document _v
  versionKey: false // You should be aware of the outcome after set to false
})

var MoviesModel = mongoose.model('movies', schemaMovies)
module.exports = MoviesModel
