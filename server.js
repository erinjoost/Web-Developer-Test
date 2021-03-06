const express = require('express')
var AWS = require('aws-sdk');
let stock = require("./api/products/index.json")

const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const contentBasePath = path.join(__dirname, 'public');

// serve static assets normally
app.use(express.static(contentBasePath))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.get('/api/products', function (request, response){
    response.sendFile(stock)
})

app.get('/', function (request, response){
  response.sendFile(path.resolve(contentBasePath, 'bundle.js'))
})

app.listen(port, (error) => {
  if (error) {
    console.error('error', error)
  } else {
    console.info(`\n ==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})