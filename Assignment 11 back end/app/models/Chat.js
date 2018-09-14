const mongoose = require('mongoose')
const Schema = mongoose.Schema
const time = require('../libs/timeLib')

const Chat = new Schema({
    chatId: { type: String, unique: true, required: true },
    senderName: { type: String, default: '' },
    senderId: { type: String, default: '' },
    message: { type: String, default: '' },
    chatRoom: { type: String, default: '' },
    createdOn: { type: Date, default: time.now() },
})
mongoose.model('Chat', Chat);
