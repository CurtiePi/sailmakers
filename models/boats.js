var mongoose        = require('mongoose');

var BoatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

}


module.exports = mongoose.model('Boat', BoatSchema)
