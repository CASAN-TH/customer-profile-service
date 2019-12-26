'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CreditpointSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Creditpoint name',
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