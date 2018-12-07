const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, context) {
    return context.prisma.posts({ where: { published: true } })
  },
  drafts(parent, args, context) {
    const id = getUserId(context)
    const where = {
      published: false,
      author: {
        id,
      },
    }
    return context.prisma.posts({ where })
  },
  post(parent, { id }, context) {
    return context.prisma.post({ id })
  },
  me(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

module.exports = { Query }
