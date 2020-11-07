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
    quote_type: {
        type: [String],
        enum: ['New Sail', 'Sail Repaiar', 'Winter Service', 'Sail Cover']
    },
    battens: {
        type: String
    },
    reefing_pts: {
        type: Number
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
    pick_drop: {
        type: String
    },
    sailing_type: {
        type: String
    },
    notes: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['pending', 'deposit', 'production', 'ready', 'pickup', 'delivery', 'paid-in-full'],
        default: 'pending'
    },
    total_due: {
        type: Number,
        defalut: 0.0
    },
    deposit: {
        type: Number,
        default: 0.0
    },
    amount_paid: {
        type: Number,
        default: 0.0
    },
    balance_due: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Quote', QuoteSchema);
