'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SecondcontactSchema = new Schema({
    u_id: {
        type: String
    },
    secondcontact: {
        type: [{
            name: {
                type: String
            },
            lastname: {
                type: String
            },
            age: {
                type: String
            },
            relation: {
                type: String
            },
            tel: {
                type: String
            },
            job: {
                type: String
            },
            salary: {
                type: String
            }
        }]
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

mongoose.model("Secondcontact", SecondcontactSchema);