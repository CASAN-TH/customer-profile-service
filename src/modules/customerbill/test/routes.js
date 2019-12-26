'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Customerbill = mongoose.model('Customerbill');

var credentials,
    token,
    mockup;

describe('Customerbill CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "u_id": "u001",
            "bills": [
                {
                    "bill_month": "12/2019",
                    "bill_status": "billing",
                    "bill_price": "1,045.91",
                    "bill_datelimit": "28/12/2019",
                    "bill_currency": "฿",
                    "bill_products": [
                        {
                            "product_name": "HUAWEI Band 4 GRAPHITE BLACK",
                            "product_amount": "1",
                            "product_currency": "฿",
                            "product_allprice": "827.64",
                            "product_charge": "35.64",
                            "product_lists": [
                                {
                                    "list_amount": "1/3",
                                    "list_month": "12/2019",
                                    "list_datelimit": "28/12/2019",
                                    "list_price": "275.88",
                                    "list_charge": "11.88" 
                                },
                                {
                                    "list_amount": "2/3",
                                    "list_month": "01/2020",
                                    "list_datelimit": "28/01/2020",
                                    "list_price": "275.88",
                                    "list_charge": "11.88" 
                                }
                            ]
                        },
                        {
                            "product_name": "Samsung Galaxy Fit e Black",
                            "product_amount": "1",
                            "product_currency": "฿",
                            "product_allprice": "1,114.38",
                            "product_charge": "91.98",
                            "product_lists": [
                                {
                                    "list_amount": "1/6",
                                    "list_month": "12/2019",
                                    "list_datelimit": "28/12/2019",
                                    "list_price": "185.73",
                                    "list_charge": "15.33" 
                                },
                                {
                                    "list_amount": "2/6",
                                    "list_month": "01/2020",
                                    "list_datelimit": "28/01/2020",
                                    "list_price": "185.73",
                                    "list_charge": "15.33" 
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Customerbill get use token', (done) => {
        request(app)
            .get('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Customerbill get by id', function (done) {

        request(app)
            .post('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/customerbills/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, mockup.u_id);
                        assert.equal(resp.data.bills[0].bill_month, mockup.bills[0].bill_month);
                        assert.equal(resp.data.bills[0].bill_status, mockup.bills[0].bill_status);
                        assert.equal(resp.data.bills[0].bill_price, mockup.bills[0].bill_price);
                        assert.equal(resp.data.bills[0].bill_datelimit, mockup.bills[0].bill_datelimit);
                        assert.equal(resp.data.bills[0].bill_currency, mockup.bills[0].bill_currency);
                        assert.equal(resp.data.bills[0].bill_products[0].product_name, mockup.bills[0].bill_products[0].product_name);
                        assert.equal(resp.data.bills[0].bill_products[0].product_amount, mockup.bills[0].bill_products[0].product_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_currency, mockup.bills[0].bill_products[0].product_currency);
                        assert.equal(resp.data.bills[0].bill_products[0].product_allprice, mockup.bills[0].bill_products[0].product_allprice);
                        assert.equal(resp.data.bills[0].bill_products[0].product_charge, mockup.bills[0].bill_products[0].product_charge);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_amount, mockup.bills[0].bill_products[0].product_lists[0].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_month, mockup.bills[0].bill_products[0].product_lists[0].list_month);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_datelimit, mockup.bills[0].bill_products[0].product_lists[0].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_price, mockup.bills[0].bill_products[0].product_lists[0].list_price);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_charge, mockup.bills[0].bill_products[0].product_lists[0].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_amount, mockup.bills[0].bill_products[0].product_lists[1].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_month, mockup.bills[0].bill_products[0].product_lists[1].list_month);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_datelimit, mockup.bills[0].bill_products[0].product_lists[1].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_price, mockup.bills[0].bill_products[0].product_lists[1].list_price);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_charge, mockup.bills[0].bill_products[0].product_lists[1].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_name, mockup.bills[0].bill_products[1].product_name);
                        assert.equal(resp.data.bills[0].bill_products[1].product_amount, mockup.bills[0].bill_products[1].product_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_currency, mockup.bills[0].bill_products[1].product_currency);
                        assert.equal(resp.data.bills[0].bill_products[1].product_allprice, mockup.bills[0].bill_products[1].product_allprice);
                        assert.equal(resp.data.bills[0].bill_products[1].product_charge, mockup.bills[0].bill_products[1].product_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_amount, mockup.bills[0].bill_products[1].product_lists[0].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_month, mockup.bills[0].bill_products[1].product_lists[0].list_month);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_datelimit, mockup.bills[0].bill_products[1].product_lists[0].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_price, mockup.bills[0].bill_products[1].product_lists[0].list_price);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_charge, mockup.bills[0].bill_products[1].product_lists[0].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_amount, mockup.bills[0].bill_products[1].product_lists[1].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_month, mockup.bills[0].bill_products[1].product_lists[1].list_month);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_datelimit, mockup.bills[0].bill_products[1].product_lists[1].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_price, mockup.bills[0].bill_products[1].product_lists[1].list_price);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_charge, mockup.bills[0].bill_products[1].product_lists[1].list_charge);
                        done();
                    });
            });

    });

    it('should be Customerbill post use token', (done) => {
        request(app)
            .post('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, mockup.u_id);
                        assert.equal(resp.data.bills[0].bill_month, mockup.bills[0].bill_month);
                        assert.equal(resp.data.bills[0].bill_status, mockup.bills[0].bill_status);
                        assert.equal(resp.data.bills[0].bill_price, mockup.bills[0].bill_price);
                        assert.equal(resp.data.bills[0].bill_datelimit, mockup.bills[0].bill_datelimit);
                        assert.equal(resp.data.bills[0].bill_currency, mockup.bills[0].bill_currency);
                        assert.equal(resp.data.bills[0].bill_products[0].product_name, mockup.bills[0].bill_products[0].product_name);
                        assert.equal(resp.data.bills[0].bill_products[0].product_amount, mockup.bills[0].bill_products[0].product_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_currency, mockup.bills[0].bill_products[0].product_currency);
                        assert.equal(resp.data.bills[0].bill_products[0].product_allprice, mockup.bills[0].bill_products[0].product_allprice);
                        assert.equal(resp.data.bills[0].bill_products[0].product_charge, mockup.bills[0].bill_products[0].product_charge);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_amount, mockup.bills[0].bill_products[0].product_lists[0].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_month, mockup.bills[0].bill_products[0].product_lists[0].list_month);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_datelimit, mockup.bills[0].bill_products[0].product_lists[0].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_price, mockup.bills[0].bill_products[0].product_lists[0].list_price);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_charge, mockup.bills[0].bill_products[0].product_lists[0].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_amount, mockup.bills[0].bill_products[0].product_lists[1].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_month, mockup.bills[0].bill_products[0].product_lists[1].list_month);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_datelimit, mockup.bills[0].bill_products[0].product_lists[1].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_price, mockup.bills[0].bill_products[0].product_lists[1].list_price);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_charge, mockup.bills[0].bill_products[0].product_lists[1].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_name, mockup.bills[0].bill_products[1].product_name);
                        assert.equal(resp.data.bills[0].bill_products[1].product_amount, mockup.bills[0].bill_products[1].product_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_currency, mockup.bills[0].bill_products[1].product_currency);
                        assert.equal(resp.data.bills[0].bill_products[1].product_allprice, mockup.bills[0].bill_products[1].product_allprice);
                        assert.equal(resp.data.bills[0].bill_products[1].product_charge, mockup.bills[0].bill_products[1].product_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_amount, mockup.bills[0].bill_products[1].product_lists[0].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_month, mockup.bills[0].bill_products[1].product_lists[0].list_month);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_datelimit, mockup.bills[0].bill_products[1].product_lists[0].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_price, mockup.bills[0].bill_products[1].product_lists[0].list_price);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_charge, mockup.bills[0].bill_products[1].product_lists[0].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_amount, mockup.bills[0].bill_products[1].product_lists[1].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_month, mockup.bills[0].bill_products[1].product_lists[1].list_month);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_datelimit, mockup.bills[0].bill_products[1].product_lists[1].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_price, mockup.bills[0].bill_products[1].product_lists[1].list_price);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_charge, mockup.bills[0].bill_products[1].product_lists[1].list_charge);
                done();
            });
    });

    it('should be customerbill put use token', function (done) {

        request(app)
            .post('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "u_id": "u001",
                    "bills": [
                        {
                            "bill_month": "12/2019 update",
                            "bill_status": "billing update",
                            "bill_price": "1,045.91 update",
                            "bill_datelimit": "28/12/2019 update",
                            "bill_currency": "฿ update",
                            "bill_products": [
                                {
                                    "product_name": "HUAWEI Band 4 GRAPHITE BLACK update",
                                    "product_amount": "1 update",
                                    "product_currency": "฿ update",
                                    "product_allprice": "827.64 update",
                                    "product_charge": "35.64 update",
                                    "product_lists": [
                                        {
                                            "list_amount": "1/3",
                                            "list_month": "12/2019",
                                            "list_datelimit": "28/12/2019",
                                            "list_price": "275.88",
                                            "list_charge": "11.88" 
                                        },
                                        {
                                            "list_amount": "2/3",
                                            "list_month": "01/2020",
                                            "list_datelimit": "28/01/2020",
                                            "list_price": "275.88",
                                            "list_charge": "11.88" 
                                        }
                                    ]
                                },
                                {
                                    "product_name": "Samsung Galaxy Fit e Black",
                                    "product_amount": "1",
                                    "product_currency": "฿",
                                    "product_allprice": "1,114.38",
                                    "product_charge": "91.98",
                                    "product_lists": [
                                        {
                                            "list_amount": "1/6",
                                            "list_month": "12/2019",
                                            "list_datelimit": "28/12/2019",
                                            "list_price": "185.73",
                                            "list_charge": "15.33" 
                                        },
                                        {
                                            "list_amount": "2/6",
                                            "list_month": "01/2020",
                                            "list_datelimit": "28/01/2020",
                                            "list_price": "185.73",
                                            "list_charge": "15.33" 
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                request(app)
                    .put('/api/customerbills/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, update.u_id);
                        assert.equal(resp.data.bills[0].bill_month, update.bills[0].bill_month);
                        assert.equal(resp.data.bills[0].bill_status, update.bills[0].bill_status);
                        assert.equal(resp.data.bills[0].bill_price, update.bills[0].bill_price);
                        assert.equal(resp.data.bills[0].bill_datelimit, update.bills[0].bill_datelimit);
                        assert.equal(resp.data.bills[0].bill_currency, update.bills[0].bill_currency);
                        assert.equal(resp.data.bills[0].bill_products[0].product_name, update.bills[0].bill_products[0].product_name);
                        assert.equal(resp.data.bills[0].bill_products[0].product_amount, update.bills[0].bill_products[0].product_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_currency, update.bills[0].bill_products[0].product_currency);
                        assert.equal(resp.data.bills[0].bill_products[0].product_allprice, update.bills[0].bill_products[0].product_allprice);
                        assert.equal(resp.data.bills[0].bill_products[0].product_charge, update.bills[0].bill_products[0].product_charge);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_amount, update.bills[0].bill_products[0].product_lists[0].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_month, update.bills[0].bill_products[0].product_lists[0].list_month);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_datelimit, update.bills[0].bill_products[0].product_lists[0].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_price, update.bills[0].bill_products[0].product_lists[0].list_price);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[0].list_charge, update.bills[0].bill_products[0].product_lists[0].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_amount, update.bills[0].bill_products[0].product_lists[1].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_month, update.bills[0].bill_products[0].product_lists[1].list_month);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_datelimit, update.bills[0].bill_products[0].product_lists[1].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_price, update.bills[0].bill_products[0].product_lists[1].list_price);
                        assert.equal(resp.data.bills[0].bill_products[0].product_lists[1].list_charge, update.bills[0].bill_products[0].product_lists[1].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_name, update.bills[0].bill_products[1].product_name);
                        assert.equal(resp.data.bills[0].bill_products[1].product_amount, update.bills[0].bill_products[1].product_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_currency, update.bills[0].bill_products[1].product_currency);
                        assert.equal(resp.data.bills[0].bill_products[1].product_allprice, update.bills[0].bill_products[1].product_allprice);
                        assert.equal(resp.data.bills[0].bill_products[1].product_charge, update.bills[0].bill_products[1].product_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_amount, update.bills[0].bill_products[1].product_lists[0].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_month, update.bills[0].bill_products[1].product_lists[0].list_month);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_datelimit, update.bills[0].bill_products[1].product_lists[0].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_price, update.bills[0].bill_products[1].product_lists[0].list_price);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[0].list_charge, update.bills[0].bill_products[1].product_lists[0].list_charge);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_amount, update.bills[0].bill_products[1].product_lists[1].list_amount);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_month, update.bills[0].bill_products[1].product_lists[1].list_month);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_datelimit, update.bills[0].bill_products[1].product_lists[1].list_datelimit);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_price, update.bills[0].bill_products[1].product_lists[1].list_price);
                        assert.equal(resp.data.bills[0].bill_products[1].product_lists[1].list_charge, update.bills[0].bill_products[1].product_lists[1].list_charge);
                        done();
                    });
            });

    });

    it('should be customerbill delete use token', function (done) {

        request(app)
            .post('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/customerbills/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be customerbill get not use token', (done) => {
        request(app)
            .get('/api/customerbills')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be customerbill post not use token', function (done) {

        request(app)
            .post('/api/customerbills')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be customerbill put not use token', function (done) {

        request(app)
            .post('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/customerbills/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be customerbill delete not use token', function (done) {

        request(app)
            .post('/api/customerbills')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/customerbills/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Customerbill.remove().exec(done);
    });

});