'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerprofileSchema = new Schema({
    frontcardimaged: {
        type: {
            url: {
                type: String
            }
        }
    },
    backcardimaged: {
        type: {
            url: {
                type: String
            }
        }
    },
    personwithcardimaged: {
        type: {
            url: {
                type: String
            }
        }
    },
    citizen_id: {
        type: String,
        required: 'Please fill a Customerprofile citizen_id',
    },
    citizenback_id: {
        type: String,
        required: 'Please fill a Customerprofile citizenback_id',
    },
    name: {
        type: String,
        required: 'Please fill a Customerprofile name'
    },
    lastname: {
        type: String,
        required: 'Please fill a Customerprofile lastname',
    },
    gender: {
        type: String,
        required: 'Please fill a Customerprofile gender',
    },
    birthdate: {
        type: String,
        required: 'Please fill a Customerprofile birthdate',
    },
    addressbycard: {
        type: String,
        required: 'Please fill a Customerprofile addressbycard',
    },
    email: {
        type: String,
        required: 'Please fill a Customerprofile email',
    },
    address: {
        type: String,
        required: 'Please fill a Customerprofile address',
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Customerprofile", CustomerprofileSchema);