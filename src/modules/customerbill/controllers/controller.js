'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Customerbill = mongoose.model('Customerbill'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

exports.getList = function (req, res) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var query = {};
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    Customerbill.find({}, {}, query, function (err, datas) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: datas
            });
        };
    });
};

exports.create = function (req, res) {
    var newCustomerbill = new Customerbill(req.body);
    newCustomerbill.createby = req.user;
    newCustomerbill.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};

exports.getByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: 400,
            message: 'Id is invalid'
        });
    }

    Customerbill.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.getByUserId = function (req, res, next) {
    Customerbill.findOne({ u_id: req.user.username }, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                massage: errorHandler.getErrorMessage(err)
            })
        } else {
            req.data = data;
            next();
        }
    });
};

exports.returnData = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : {
            "u_id": "",
            "bills": [
                {
                    "bill_month": "",
                    "bill_status": "",
                    "bill_price": "",
                    "bill_datelimit": "",
                    "bill_currency": "",
                    "bill_products": [
                        {
                            "product_name": "",
                            "product_amount": "",
                            "product_currency": "",
                            "product_allprice": "",
                            "product_charge": "",
                            "product_lists": [
                                {
                                    "list_amount": "",
                                    "list_month": "",
                                    "list_datelimit": "",
                                    "list_price": "",
                                    "list_charge": "" 
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    })
};

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var updCustomerbill = _.extend(req.data, req.body);
    updCustomerbill.updated = new Date();
    updCustomerbill.updateby = req.user;
    updCustomerbill.save(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp({
                status: 200,
                data: data
            });
        };
    });
};
