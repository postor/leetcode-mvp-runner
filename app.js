const { join } = require('path')
const { writeFile, ensureDir, remove } = require('fs-extra')
const exec = require('await-exec')
const express = require('express')
require('express-async-errors')
const { json } = require('body-parser')
const uniqid = require('uniqid')
const camelCase = require('camelcase')
const { languages } = require('./config')
const app = express()
const port = 3002

console.log('Make sure you run on Linux, got Docker and Node image!')

app.get('/', (req, res) => res.send('Hello World!'))
app.use(json())
app.post('/', async (req, res) => {
  const { key, code, language = 'nodejs' } = req.body
  const fileName = uniqid() + '.js'
  const tmpDir = process.env.RUNNER_TEMP_DIR || join(__dirname, '.tmp')
  await ensureDir(tmpDir)
  const filePath = join(tmpDir, fileName)
  await writeFile(filePath, code)
  const dockerMapPath = `/app/answers/${key}.js`
  const vfile = `-v ${filePath}:${dockerMapPath}`
  const env = `-e "TESTKEY=${key}" -e "TESTKEYCAMEL=${camelCase(key, { pascalCase: true })}"`
  const { image } = languages[language]
  const command = `docker run --rm ${vfile} ${env} ${image}`
  try {
    let rtn = await exec(command)
    await remove(filePath)
    res.json(rtn)
  } catch (e) {
    await remove(filePath)
    res.json(e)
  }
});

(async () => {
  await Promise.all(Object.values(languages).map(async ({ image }) => {
    console.log(`pulling docker image ${image}`)
    await exec(`docker pull ${image}`)
    console.log(`docker image ${image} loaded!`)
  }))
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})()