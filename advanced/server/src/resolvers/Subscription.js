const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.post({}, info)
    },
  },
}

// This is the same subscription as above but only fires for 
// posts that have been published.
// This feature is not yet live due to a gub in Prisma:
// https://github.com/graphcool/prisma/issues/1734
// const Subscription = {
//   feedSubscription: {
//     subscribe: (parent, args, ctx, info) => {
//       return ctx.db.subscription.post(
//         {
//           where: {
//             node: {
//               isPublished: true,
//             },
//           },
//         },
//         info,
//       )
//     },
//   },
// }

module.exports = { Subscription }
