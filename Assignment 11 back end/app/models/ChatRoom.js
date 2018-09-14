const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const ChatRoom = new Schema({
    chatRoomId: { type: String, unique: true, required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default:true },
    createdOn: { type: Date, default: time.now() }
})

module.exports = mongoose.model('ChatRoom', ChatRoom)
