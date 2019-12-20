'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MenuSchema = new Schema({
    menus: {
        type: [{
            name: {
                type: String
            },
            detail: {
                type: String
            },
            image: {
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

mongoose.model("Menu", MenuSchema);