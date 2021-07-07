const mongoose = require('mongoose');
//JSON body schema
const isSetSchema = mongoose.Schema({
    isSet: {
            type: Number,
        required: true
    }
});
module.exports = mongoose.model('isSet', isSetSchema);