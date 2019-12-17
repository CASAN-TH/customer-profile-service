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
    u_id: {
        type: String
    },
    citizen_id: {
        type: String
    },
    citizenback_id: {
        type: String
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    birthdate: {
        type: String
    },
    addressbycard: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
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