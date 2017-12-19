const fs = require('fs')
const path = require('path')
const commandExists = require('command-exists')

module.exports = async ({ project, projectPath }) => {
  const templateName = 'graphql-boilerplate'
  replaceInFile('server/src/index.js', templateName, project)
  replaceInFile('server/package.json', templateName, project)
  replaceInFile('server/graphcool.yml', templateName, project)

  process.chdir(path.join(projectPath, 'server'))
  if (commandExists.sync('yarn')) {
    await shell('yarn install')
  } else {
    await shell('npm install')
  }
  process.chdir(projectPath)

  console.log(`\
Next steps:

  1. Change directory: \`cd ${project}/server\`
  2. Deploy database service: \`graphcool deploy\`
  3. Start local server: \`yarn start\` (you can now open a Playground at http://localhost:4000)
  4. Change directory: \`cd ..\`
  5. Start React app: \`yarn start\`
  6. Open browser: http://localhost:3000
  `)
}

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, 'utf8')
  const newContents = contents.replace(
    new RegExp(searchValue, 'g'),
    replaceValue,
  )
  fs.writeFileSync(filePath, newContents)
}

function shell(command) {
  return new Promise((resolve, reject) => {
    const commandParts = command.split(' ')
    const cmd = spawn(commandParts[0], commandParts.slice(1), {
      cwd: process.cwd(),
      detached: false,
      stdio: 'inherit',
    })

    cmd.on('error', reject)
    cmd.on('close', resolve)
  })
}
