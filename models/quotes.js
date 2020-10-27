var mongoose        = require('mongoose');

var QuoteSchema = new mongoose.Schema({
    salesperson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salesperson',
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    boat_type: {
        type: String
    },
    boat_name: {
        type: String
    },
    home_port: {
        type: String
    },
    sail_request: {
        type: String
    },
    battens: {
        type: String
    },
    reefing_pts: {
        type: String
    },
    num_logo: {
        type: String
    },
    furl_sys: {
        type: String
    },
    uv_color: {
        type: String
    },
    home_port: {
        type: String
    },
    delivery_type: {
        type: String
    },
    sailing_type: {
        type: String
    },
    notes: {
        type: String
    },
    active: {
        type: Boolean
        default: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Quote', QuoteSchema);
