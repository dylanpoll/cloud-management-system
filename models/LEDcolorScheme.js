const mongoose = require('mongoose');
//schema it is 0-29 so 30 total LED's
//this is left in incase someone wants to post the LED scheme to a DB
const UsersSchema = mongoose.Schema({
    led0: {
        type: String,
        required: false
    },
    led1: {
        type: String,
        required: false
    },
    led2: {
        type: String,
        required: false
    },
    led3: {
        type: String,
        required: false
    },
    led4: {
        type: String,
        required: false
    },
    led5: {
        type: String,
        required: false
    },
    led6: {
        type: String,
        required: false
    },
    led7: {
        type: String,
        required: false
    },
    led8: {
        type: String,
        required: false
    },
    led9: {
        type: String,
        required: false
    },
    led10: {
        type: String,
        required: false
    },
    led11: {
        type: String,
        required: false
    },
    led12: {
        type: String,
        required: false
    },
    led13: {
        type: String,
        required: false
    },
    led14: {
        type: String,
        required: false
    },
    led15: {
        type: String,
        required: false
    },
    led16: {
        type: String,
        required: false
    },
    led17: {
        type: String,
        required: false
    },
    led18: {
        type: String,
        required: false
    },
    led19: {
        type: String,
        required: false
    },
    led20: {
        type: String,
        required: false
    },
    led21: {
        type: String,
        required: false
    },
    led22: {
        type: String,
        required: false
    },
    led23: {
        type: String,
        required: false
    },
    led24: {
        type: String,
        required: false
    },
    led25: {
        type: String,
        required: false
    },
    led26: {
        type: String,
        required: false
    },
    led27: {
        type: String,
        required: false
    },
    led28: {
        type: String,
        required: false
    },
    led29: {
        type: String,
        required: false
    },led30: {
        type: String,
        required: false
    },
    led31: {
        type: String,
        required: false
    },
    led32: {
        type: String,
        required: false
    },
    led33: {
        type: String,
        required: false
    },
    led34: {
        type: String,
        required: false
    },
    led35: {
        type: String,
        required: false
    },
    led36: {
        type: String,
        required: false
    },
    led37: {
        type: String,
        required: false
    },
    led38: {
        type: String,
        required: false
    },
    led39: {
        type: String,
        required: false
    },
    led40: {
        type: String,
        required: false
    },
    led41: {
        type: String,
        required: false
    },
    led42: {
        type: String,
        required: false
    },
    led43: {
        type: String,
        required: false
    },
    led44: {
        type: String,
        required: false
    },
    led45: {
        type: String,
        required: false
    },
    led46: {
        type: String,
        required: false
    },
    led47: {
        type: String,
        required: false
    },
    led48: {
        type: String,
        required: false
    },
    led49: {
        type: String,
        required: false
    },
    led50: {
        type: String,
        required: false
    },
    led51: {
        type: String,
        required: false
    },
    led52: {
        type: String,
        required: false
    },
    led53: {
        type: String,
        required: false
    },
    led54: {
        type: String,
        required: false
    },
    led55: {
        type: String,
        required: false
    },
    led56: {
        type: String,
        required: false
    },
    led57: {
        type: String,
        required: false
    },
    led58: {
        type: String,
        required: false
    },
    led59: {
        type: String,
        required: false
    },
    led60: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model('Users', UsersSchema);