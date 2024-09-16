const mongoose = require("mongoose")
const schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId

const User = new schema ({
    email: {type: String, unique: true},
    name: String,
    password: String
})

const todo = new schema({
    title: String,
    done: String,
    userId: { type: schema.Types.ObjectId, ref: "users"}
})

const userModel = mongoose.model('users', User)
const todoModel = mongoose.model('todos', todo)

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}