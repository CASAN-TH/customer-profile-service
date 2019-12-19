'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Marriage = mongoose.model('Marriage');

var credentials,
    token,
    mockup;

describe('Marriage CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "marriage": "โสด"
        };
        credentials = {
            username: '0992436806',
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

    it('should be Marriage get use token', (done) => {
        request(app)
            .get('/api/marriages')
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

    it('should be Marriage get by id', function (done) {

        request(app)
            .post('/api/marriages')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/marriages/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.marriage, mockup.marriage);
                        done();
                    });
            });

    });

    it('should be Marriage post use token', (done) => {
        request(app)
            .post('/api/marriages')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.u_id, credentials.username);
                assert.equal(resp.data.marriage, mockup.marriage);
                done();
            });
    });

    it('should be marriage put use token', function (done) {

        request(app)
            .post('/api/marriages')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    marriage: 'แต่งงานแล้ว'
                }
                request(app)
                    .put('/api/marriages/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.marriage, update.marriage);
                        done();
                    });
            });

    });

    it('should be marriage delete use token', function (done) {

        request(app)
            .post('/api/marriages')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/marriages/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be marriage get not use token', (done) => {
        request(app)
            .get('/api/marriages')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be marriage post not use token', function (done) {

        request(app)
            .post('/api/marriages')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be marriage put not use token', function (done) {

        request(app)
            .post('/api/marriages')
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
                    .put('/api/marriages/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be marriage delete not use token', function (done) {

        request(app)
            .post('/api/marriages')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/marriages/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be have data Marriage and get data by UserId', function (done) {
        request(app)
            .post('/api/marriages')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/marriagebyuserid')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.marriage, mockup.marriage);
                        done();
                    });
            });
    });

    it('should be not have Marriage data then get data blank', function (done) {
        credentials = {
            username: '099243680659',
            password: 'password',
            firstname: 'unknow',
            lastname: 'unknow',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });

        var marriage1 = new Marriage({
            "u_id": "099243680000",
            "marriage": "โสด"
        });

        marriage1.save(function (err, data) {
            request(app)
                .get('/api/marriagebyuserid')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    var resp = res.body;
                    assert.equal(resp.data.u_id, "");
                    assert.equal(resp.data.marriage, "");
                    done();
                });
        })
    });

    afterEach(function (done) {
        Marriage.remove().exec(done);
    });

});