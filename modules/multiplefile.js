const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    files: [Object],
    //  userId: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    //   }
}, {timestamps: true});

module.exports = mongoose.model('MultipleFile', mulitipleFileSchema);