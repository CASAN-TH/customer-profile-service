'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CreditpointSchema = new Schema({
    u_id: {
        type: String
    },
    credit: {
        type: {
            creditremain: {
                type: Number
            },
            creditall: {
                type: Number
            },
            creditstable: {
                type: Number
            },
            credittemporary: {
                type: Number
            }
        }
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

mongoose.model("Creditpoint", CreditpointSchema);