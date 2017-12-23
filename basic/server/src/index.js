const { GraphQLServer } = require('graphql-yoga')
const { importSchema } = require('graphql-import')
const { Graphcool } = require('graphcool-binding')
const typeDefs = importSchema('./src/schema.graphql')

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts(
        {
          orderBy: 'createdAt_DESC',
        },
        info,
      )
    },
    post(parent, args, ctx, info) {
      return ctx.db.query.post(
        {
          where: { id: args.id },
        },
        info,
      )
    },
  },
  Mutation: {
    createPost(parent, args, ctx, info) {
      return ctx.db.mutation.createPost(
        {
          data: {
            description: args.description,
            imageUrl: args.imageUrl,
          },
        },
        info,
      )
    },
    deletePost(parent, args, ctx, info) {
      return ctx.db.mutation.deletePost(
        {
          where: { id: args.id },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Graphcool({
      schemaPath: './database/schema.generated.graphql',
      endpoint: 'http://localhost:60000/api/graphql-boilerplate/dev',
      secret: 'mysecret123',
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
