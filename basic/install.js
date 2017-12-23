const fs = require('fs')
const path = require('path')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'
  replaceInFile('server/src/index.js', templateName, project)
  replaceInFile('server/package.json', templateName, project)
  replaceInFile('server/graphcool.yml', templateName, project)

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
