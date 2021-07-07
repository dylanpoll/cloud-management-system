const mongoose = require('mongoose');
//schema it is 0-29 so 30 total LED's
//this is left in incase someone wants to post the LED scheme to a DB
const HomeSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    isHome: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('PeopleHome', HomeSchema);