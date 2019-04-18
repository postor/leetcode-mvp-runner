const { join } = require('path')
const { writeFile } = require('fs-extra')
const exec = require('await-exec')
const express = require('express')
const { json } = require('body-parser')
const uniqid = require('uniqid')
const app = express()
const port = 3002

console.log('Make sure you run on Linux, got Docker and Node image!')
app.get('/', (req, res) => res.send('Hello World!'))
app.use(json())
app.post('/', async (req, res) => {
  const { key, code } = req.body
  const fileName = uniqid() + '.js'
  const filePath = join(__dirname, '.tmp', fileName)
  await writeFile(filePath, code)
  const dockerMapPath = `/app/answers/${key}.js`
  const jestCmd = `yarn jest ${key}.test.js`
  const vfolder = `-v ${__dirname}:/app`
  const vfile = `-v ${join(__dirname, '.tmp', fileName)}:${dockerMapPath}`
  const command = `docker run -it --rm ${vfolder} ${vfile} -w=/app node ${jestCmd}`
  try {
    res.json(await exec(command))
  } catch (e) {
    res.json(e)
  }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))