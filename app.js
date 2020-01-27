const config = require('./utils/config.js')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogBook.js')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const usersRouter = require("./controllers/users.js")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(bodyParser.json())
  app.use(middleware.requestLogger)
  app.use('/api/blogs', blogRouter)
  app.use('/api/users', usersRouter)
  
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

module.exports = app