'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactSchema = new Schema({
    u_id: {
        type: String
    },
    contact: {
        type: {
            newtel1: {
                type: String
            },
            newtel2: {
                type: String
            },
            telhome: {
                type: String
            },
            lineaccount1: {
                type: String
            },
            lineaccount2: {
                type: String
            },
            fbaccount: {
                type: String
            },
            igaccount: {
                type: String
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

mongoose.model("Contact", ContactSchema);