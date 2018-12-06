const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
  makeSandboxEndpoint,
} = require('graphql-boilerplate-install')

module.exports = async ({ project, projectDir }) => {
  const templateName = 'graphql-boilerplate'

  const endpoint = await makeSandboxEndpoint(project)

  process.chdir('server/')
  replaceInFiles(
    ['src/index.js', 'package.json', 'prisma/prisma.yml'],
    templateName,
    project,
  )
  replaceInFiles(['src/index.js'], '__PRISMA_ENDPOINT__', endpoint)
  replaceInFiles(['prisma/prisma.yml'], '__PRISMA_ENDPOINT__', endpoint)

  console.log('Running $ prisma deploy...')

  await deploy(false)
  const info = await getInfo()

  process.chdir('../')

  replaceInFiles(
    ['server/src/generated/prisma-client/index.js'],
    '__PRISMA_ENDPOINT__',
    info.httpEndpoint,
  )

  console.log(`\
Next steps:
  1. Change directory: \`cd ${projectDir}/server\`
  2. Start local server: \`yarn start\` (you can now open a Playground at http://localhost:4000)
  3. Change directory: \`cd ..\`
  4. Start React app: \`yarn start\`
  5. Open browser: http://localhost:3000
`)
}
