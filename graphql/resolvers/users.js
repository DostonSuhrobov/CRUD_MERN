const User = require('../../models/User');

module.exports = { 
    Mutation: {
        register(_, args, context, info){
            // TODO validate data
            // TODO make sure user does not already exist
            // TODO create authentication token
        }
    }
}
