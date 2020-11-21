var mongoose        = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
    },
    phone: {
        type: String,
    },
    quotes: [{type: mongoose.Schema.ObjectId, ref: 'Quote'}],
    boat_model: {
        type: String
    },
    boat_home: {
        type: String,
    },
    boat_name: {
        type: String,
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});


CustomerSchema.methods.getFullname = function () {

    fullName = `${this.fname} ${this.lname}`
    return fullName
}

module.exports = mongoose.model('Customer', CustomerSchema);
