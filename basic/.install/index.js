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
    ['src/index.js', 'package.json', 'database/prisma.yml'],
    templateName,
    project,
  )

  console.log('Running $ prisma deploy...')
  await deploy(false)
  const info = await getInfo()

  replaceInFiles(['src/index.js'], '__PRISMA_ENDPOINT__', info.httpEndpoint)

  console.log(`\
Next steps:
  1. Change directory: \`cd ${projectDir}\`
  2. Start local server and open Playground: \`yarn dev\`
`)
}
