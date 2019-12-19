'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AssetdocsSchema = new Schema({
    u_id: {
        type: String
    },
    assetdocs: {
        type: [
            {
                name: {
                    type: String
                },
                images: {
                    type: [
                        {
                            url: {
                                type: String
                            }
                        }
                    ]
                }
            }
        ]
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

mongoose.model("Assetdocs", AssetdocsSchema);