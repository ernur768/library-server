const {Schema, model} = require('mongoose');

const BookSchema = new Schema({
    id: { type: String, required: true},
    title: {type: String},
    subtitle: {type: String},
    authors: {type: [String]},
    publisher: {type: String},
    description: {type: String},
    pageCount: {type: Number},
    categories: {type: [String]},
    thumbnail: {type: String},
    listType: {type: String}
})


const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String, required: true},
    role: {type: String, default: "user"},
    books: {type: [BookSchema], default: []},
    listTypes: {
        type: [String],
        default: [
            'читаю',
            'в планах',
            'брошено',
            'прочитано',
            'любимые',
        ]
    }
})

module.exports = model('User', UserSchema);