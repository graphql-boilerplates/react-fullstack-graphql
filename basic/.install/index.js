const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
} = require('graphql-boilerplate-install')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(
    ['server/src/index.js', 'server/package.json', 'server/database/graphcool.yml'],
    templateName,
    project,
  )

  console.log('Running $ graphcool deploy...')
  await deploy(false)
  const info = await getInfo()

  replaceInFiles(['server/src/index.js'], '__GRAPHCOOL_ENDPOINT__', info.httpEndpoint)

  console.log(`\
Next steps:
  1. Change directory: \`cd ${project}/server\`
  2. Start local server: \`yarn start\`
  3. Start local server: \`yarn start\` (you can now open a Playground at http://localhost:4000)
  4. Change directory: \`cd ..\`
  5. Start React app: \`yarn start\`
  6. Open browser: http://localhost:3000
`)
}
