const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
} = require('graphql-boilerplate-install')

module.exports = async ({ project, projectDir }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(
    ['server/src/index.js', 'server/package.json', 'server/database/graphcool.yml'],
    templateName,
    project,
  )

  console.log('Running $ graphcool deploy...')

  process.chdir('server/')

  await deploy(false)
  const info = await getInfo()

  process.chdir('../')

  replaceInFiles(['server/src/index.js'], '__GRAPHCOOL_ENDPOINT__', info.httpEndpoint)

  console.log(`\
Next steps:
  1. Change directory: \`cd ${projectDir}/server\`
  2. Start local server: \`yarn start\` (you can now open a Playground at http://localhost:4000)
  3. Change directory: \`cd ..\`
  4. Start React app: \`yarn start\`
  5. Open browser: http://localhost:3000
`)
}
