'use strict';
var mongoose = require('mongoose'),
    model = require('../models/model'),
    mq = require('../../core/controllers/rabbitmq'),
    Assetdocs = mongoose.model('Assetdocs'),
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
    Assetdocs.find({}, {}, query, function (err, datas) {
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
    var newAssetdocs = new Assetdocs(req.body);
    newAssetdocs.createby = req.user;
    newAssetdocs.u_id = req.user.username;
    newAssetdocs.save(function (err, data) {
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

    Assetdocs.findById(id, function (err, data) {
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
    Assetdocs.findOne({ u_id: req.user.username }, function (err, data) {
        if (err) {
            return res.status(400).send({
                status: 400,
                massage: errorHandler.getErrorMessage(err)
            });
        } else {
            req.data = data;
            next();
        }
    })
};

exports.returnData = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : {
            "u_id": "",
            "assetdocs": [
                {
                    "name": "เล่มทะเบียนรถยนต์",
                    "images": []
                },
                {
                    "name": "เล่มทะเบียนรถจักรยานยนต์",
                    "images": []
                },
                {
                    "name": "หนังสือเดินทาง",
                    "images": []
                },
                {
                    "name": "ประกันชีวิต",
                    "images": []
                },
                {
                    "name": "เอกสารกรรมสิทธิ์ห้องชุด",
                    "images": []
                },
                {
                    "name": "รายได้ต่อเดือนของครอบครัว",
                    "images": []
                },
                {
                    "name": "ทะเบียนบ้าน",
                    "images": []
                }
            ]
        }
    })
}

exports.read = function (req, res) {
    res.jsonp({
        status: 200,
        data: req.data ? req.data : []
    });
};

exports.update = function (req, res) {
    var updAssetdocs = _.extend(req.data, req.body);
    updAssetdocs.updated = new Date();
    updAssetdocs.updateby = req.user;
    updAssetdocs.save(function (err, data) {
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
