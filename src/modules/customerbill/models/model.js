'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerbillSchema = new Schema({
    u_id: {
        type: String
    },
    bills: {
        type: [
            {
                bill_month: {
                    type: String
                },
                bill_status: {
                    type: String,
                    enum: ['billing', 'nobill']
                },
                bill_price: {
                    type: String
                },
                bill_datelimit: {
                    type: String
                },
                bill_currency: {
                    type: String
                },
                bill_products: {
                    type: [
                        {
                            product_name: {
                                type: String
                            },
                            product_amount: {
                                type: String
                            },
                            product_currency: {
                                type: String
                            },
                            product_allprice: {
                                type: String
                            },
                            product_charge: {
                                type: String
                            },
                            product_lists: {
                                type: [
                                    {
                                        list_amount: {
                                            type: String
                                        },
                                        list_month: {
                                            type: String
                                        },
                                        list_datelimit: {
                                            type: String
                                        },
                                        list_price: {
                                            type: String
                                        },
                                        list_charge: {
                                            type: String
                                        }
                                    }
                                ]
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

mongoose.model("Customerbill", CustomerbillSchema);