require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
//const uuid = require('uuid/v4');
const errorHandler = require('./error-handler')
const validateBearerToken = require('./validate-bearer-token')
const booksmarksRouter = require('./booksmarks/booksmarks-router')


const app = express()



//const morganOption = (NODE_ENV === 'production')

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(validateBearerToken)

app.use(booksmarksRouter)
//app.use(express.json())


app.get('/', (req, res) => {

  res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app