const {Schema, model} = require('mongoose');

const BookSchema = new Schema({
    id: { type: String, required: true, unique: true },
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

module.exports = model('MainPageBook', BookSchema)