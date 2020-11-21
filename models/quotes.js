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
    boat_model: {
        type: String
    },
    boat_name: {
        type: String
    },
    boat_home: {
        type: String
    },
    sail_request: {
        type: String
    },
    quote_type: {
        type: [String],
        enum: ['new sail', 'sail repair', 'winter service', 'sail cover']
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
    pick_drop: {
        type: String
    },
    sailing_type: {
        type: String
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['quote request', 'pending', 'production', 'ready', 'delivered', 'closed'],
        default: 'quote request'
    },
    quote_price: {
        type: Number,
        default: 0.0
    },
    amount_paid: {
        type: Number,
        default: 0.0
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Quote', QuoteSchema);
