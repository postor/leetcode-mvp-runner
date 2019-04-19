const { join } = require('path')
const { writeFile, ensureDir, remove } = require('fs-extra')
const exec = require('await-exec')
const express = require('express')
const { json } = require('body-parser')
const uniqid = require('uniqid')
const app = express()
const port = 3002

console.log('Make sure you run on Linux, got Docker and Node image!')
const nodeImage = process.env.NODE_IMAGE || 'node:8-alpine'
app.get('/', (req, res) => res.send('Hello World!'))
app.use(json())
app.post('/', async (req, res) => {
  const { key, code } = req.body
  const fileName = uniqid() + '.js'
  const tmpDir = process.env.RUNNER_TEMP_DIR || join(__dirname, '.tmp')
  await ensureDir(tmpDir)
  const filePath = join(tmpDir, fileName)
  await writeFile(filePath, code)
  const dockerMapPath = `/app/answers/${key}.js`
  const jestCmd = `yarn jest ${key}.test.js`
  const vfolder = `-v ${process.env.RUNNER_APP_VOLUME || __dirname}:/app`
  const vfile = `-v ${filePath}:${dockerMapPath}`
  const command = `docker run --rm ${vfolder} ${vfile} -w=/app ${nodeImage} ${jestCmd}`
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
  console.log(`pulling docker image ${nodeImage}`)
  await exec(`docker pull ${nodeImage}`)
  console.log(`docker image ${nodeImage} loaded!`)
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})()