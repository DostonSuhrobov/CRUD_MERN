const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserInputError } = require('apollo-server');

const {validateRegisterInput} = require('../../util/validators');
const { SECRET_KEY } = require('../../config');

module.exports = { 
    Mutation: {
       async register(_, { registerInput : { 
            username, 
            email,
            password, 
            confirmPassword 
        } },
         context,
         info
        ){
            //  validate data
            const { errors, valid  } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid)
            {
                throw new UserInputError('Error', { errors });
            }

            //  make sure user does not already exist
            const user = await User.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            //  authentication token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h'});

            return {
                ...res._doc,
                id:res._id,
                token
            }
        }
    }
}
