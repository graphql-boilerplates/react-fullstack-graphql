const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`

const opts = {
  port: 4000 //configurable port no
}

const resolvers = {
  Query: {
    hello: (_, { name }) => { 
      const returnValue = !name ? `Hello ${name || 'World!'}` : null
      return returnValue
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.start(() => console.log(`Server is running at http://localhost:${opts.port}`))