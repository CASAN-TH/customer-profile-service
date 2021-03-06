'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Creditpoint = mongoose.model('Creditpoint');

var credentials,
    token,
    mockup;

describe('Creditpoint CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "u_id": "u001",
            "credit": {
                "creditstable": 10100,
                "credittemporary": 0
            }
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

    it('should be Creditpoint get use token', (done) => {
        request(app)
            .get('/api/creditpoints')
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

    it('should be Creditpoint get by id', function (done) {

        request(app)
            .post('/api/creditpoints')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/creditpoints/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, mockup.u_id);
                        assert.equal(resp.data.credit.creditremain, resp.data.credit.creditall);
                        assert.equal(resp.data.credit.creditall, mockup.credit.creditstable + mockup.credit.credittemporary);
                        assert.equal(resp.data.credit.creditstable, mockup.credit.creditstable);
                        assert.equal(resp.data.credit.credittemporary, mockup.credit.credittemporary);
                        done();
                    });
            });

    });

    it('should be Creditpoint post use token', (done) => {
        request(app)
            .post('/api/creditpoints')
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
                assert.equal(resp.data.credit.creditremain, resp.data.credit.creditall);
                assert.equal(resp.data.credit.creditall, mockup.credit.creditstable + mockup.credit.credittemporary);
                assert.equal(resp.data.credit.creditstable, mockup.credit.creditstable);
                assert.equal(resp.data.credit.credittemporary, mockup.credit.credittemporary);
                done();
            });
    });

    it('should be creditpoint put use token', function (done) {

        request(app)
            .post('/api/creditpoints')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "u_id": "u001 update",
                    "credit": {
                        "creditremain": 8300,
                        "creditall": 12000,
                        "creditstable": 12000,
                        "credittemporary": 0
                    }
                }
                request(app)
                    .put('/api/creditpoints/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.u_id, update.u_id);
                        assert.equal(resp.data.credit.creditremain, update.credit.creditremain);
                        assert.equal(resp.data.credit.creditall, update.credit.creditall);
                        assert.equal(resp.data.credit.creditstable, update.credit.creditstable);
                        assert.equal(resp.data.credit.credittemporary, update.credit.credittemporary);
                        done();
                    });
            });

    });

    it('should be creditpoint delete use token', function (done) {

        request(app)
            .post('/api/creditpoints')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/creditpoints/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be creditpoint get not use token', (done) => {
        request(app)
            .get('/api/creditpoints')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be creditpoint post not use token', function (done) {

        request(app)
            .post('/api/creditpoints')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be creditpoint put not use token', function (done) {

        request(app)
            .post('/api/creditpoints')
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
                    .put('/api/creditpoints/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be creditpoint delete not use token', function (done) {

        request(app)
            .post('/api/creditpoints')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/creditpoints/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Creditpoint.remove().exec(done);
    });

});