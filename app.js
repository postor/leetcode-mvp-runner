const { join } = require('path')
const express = require('express')
const { json } = require('body-parser')
const uniqid = require('uniqid')
const app = express()
const port = 3002

console.log('Make sure you run on Linux, got Docker and Node image!')
app.get('/', (req, res) => res.send('Hello World!'))
app.use(json())
app.post('/', (req, res) => {
  const { key, code } = req.body
  let fileName = join(__dirname, '.tmp', uniqid())
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))