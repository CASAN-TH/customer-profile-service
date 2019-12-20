'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Menu = mongoose.model('Menu'),
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
    Menu.find({}, {}, query, function (err, datas) {
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
    var newMenu = new Menu(req.body);
    newMenu.createby = req.user;
    newMenu.save(function (err, data) {
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

    Menu.findById(id, function (err, data) {
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

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.findMenu = function (req, res, next) {
    var id = req.body._id;
    var menus = req.data.menus;

    var idxMenu = menus.findIndex(function (params) {
        return params._id.toString() === id.toString();
    });

    req.data.menus[idxMenu] = req.body;
    next();
    // console.log(req.data)
}

exports.returnUpdate = function (req, res) {
    var data = req.data;
    Menu.findOneAndUpdate({ _id: data._id }, data, { new: true }, function (err, resData) {
        if (err) {
            return res.status(400).send({
                status: 400,
                massage: errorHandler.getErrorMessage(err)
            })
        } else {
            res.jsonp({
                status: 200,
                data: resData ? resData : {}
            })
        }
    });

    // var updMenu = _.extend(req.data, req.body);
    // updMenu.updated = new Date();
    // updMenu.updateby = req.user;
    // updMenu.save(function (err, data) {
    //     if (err) {
    //         return res.status(400).send({
    //             status: 400,
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         res.jsonp({
    //             status: 200,
    //             data: data
    //         });
    //     };
    // });
};

exports.addMenu = function (req, res, next) {
    var menus = req.data.menus;
    var body = req.body;
    
    menus.push(body)
    req.data.munus = menus
    next();
}

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
