const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Static signup method
userSchema.statics.signup = async function (email,password) {

    //validation

    if(!email || !password) {
        throw Error ('All fields must be filled in');
    }
    if(!validator.isEmail(email)) {
        throw Error ('Invalid email');
    }
    if(!validator.isStrongPassword(password)){
        throw Error ('Password not strong enough');
    }


    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password:hash})

    return user
}


//Static login method

userSchema.statics.login = async function (email,password) {
    if(!email || !password) {
        throw Error ('All fields must be filled in');
    }

    const user = await this.findOne({email})

    if (!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect Password')
    }

    return user

}
//validation
module.exports = mongoose.model('User', userSchema);