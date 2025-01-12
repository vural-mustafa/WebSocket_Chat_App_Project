import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = Schema({
    fullName: {type:String, required:true},
    username: {type:String, required:true, unique: true},
    password: {type:String, required:true, minLength: 6},
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password =  await bcrypt.hash(this.password,salt)
})

const UserModel = mongoose.model('user',userSchema)

export default UserModel
