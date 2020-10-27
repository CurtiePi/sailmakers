var mongoose        = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
    },
    phone: {
        type: String,
    },
    boat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boat',
    },
    boat_home: {
        type: String,
    },
    boat_name: {
        type: String,
    }
}, {
    timestamps: true
});


CustomerSchema.methods.getFullName = function() {

    fullName = `${this.fname} ${this.lname}`
    return fullName

}

module.exports = mongoose.model('Customer', CustomerSchema);
