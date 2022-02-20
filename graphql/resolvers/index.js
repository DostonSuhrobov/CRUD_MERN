const PostResolvers = require('./posts');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...PostResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}



