'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Contact = mongoose.model('Contact');

var credentials,
    token,
    mockup;

describe('Contact CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "contact": {
                "newtel1": "0960236211",
                "newtel2": "",
                "telhome": "",
                "lineaccount1": "rock.shit",
                "lineaccount2": "",
                "fbaccount": "krittin tch",
                "igaccount": "krittin tch"
            }
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

    it('should be Contact get use token', (done) => {
        request(app)
            .get('/api/contacts')
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

    it('should be Contact get by id', function (done) {

        request(app)
            .post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/contacts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.contact.newtel1, mockup.contact.newtel1);
                        assert.equal(resp.data.contact.newtel2, mockup.contact.newtel2);
                        assert.equal(resp.data.contact.telhome, mockup.contact.telhome);
                        assert.equal(resp.data.contact.lineaccount1, mockup.contact.lineaccount1);
                        assert.equal(resp.data.contact.lineaccount2, mockup.contact.lineaccount2);
                        assert.equal(resp.data.contact.fbaccount, mockup.contact.fbaccount);
                        assert.equal(resp.data.contact.igaccount, mockup.contact.igaccount);
                        done();
                    });
            });

    });

    it('should be Contact post use token', (done) => {
        request(app)
            .post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                // console.log(resp.data)
                assert.equal(resp.data.u_id, credentials.username);
                assert.equal(resp.data.contact.newtel1, mockup.contact.newtel1);
                assert.equal(resp.data.contact.newtel2, mockup.contact.newtel2);
                assert.equal(resp.data.contact.telhome, mockup.contact.telhome);
                assert.equal(resp.data.contact.lineaccount1, mockup.contact.lineaccount1);
                assert.equal(resp.data.contact.lineaccount2, mockup.contact.lineaccount2);
                assert.equal(resp.data.contact.fbaccount, mockup.contact.fbaccount);
                assert.equal(resp.data.contact.igaccount, mockup.contact.igaccount);
                done();
            });
    });

    it('should be contact put use token', function (done) {

        request(app)
            .post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "contact": {
                        "newtel1": "0960236211 update",
                        "newtel2": "update",
                        "telhome": "update",
                        "lineaccount1": "rock.shit update",
                        "lineaccount2": "update",
                        "fbaccount": "krittin tch update",
                        "igaccount": "krittin tch update"
                    }
                }
                request(app)
                    .put('/api/contacts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.contact.newtel1, update.contact.newtel1);
                        assert.equal(resp.data.contact.newtel2, update.contact.newtel2);
                        assert.equal(resp.data.contact.telhome, update.contact.telhome);
                        assert.equal(resp.data.contact.lineaccount1, update.contact.lineaccount1);
                        assert.equal(resp.data.contact.lineaccount2, update.contact.lineaccount2);
                        assert.equal(resp.data.contact.fbaccount, update.contact.fbaccount);
                        assert.equal(resp.data.contact.igaccount, update.contact.igaccount);
                        done();
                    });
            });

    });

    it('should be contact delete use token', function (done) {

        request(app)
            .post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/contacts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be contact get not use token', (done) => {
        request(app)
            .get('/api/contacts')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be contact post not use token', function (done) {

        request(app)
            .post('/api/contacts')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be contact put not use token', function (done) {

        request(app)
            .post('/api/contacts')
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
                    .put('/api/contacts/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be contact delete not use token', function (done) {

        request(app)
            .post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/contacts/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be have data and get data by UserId', function (done) {
        request(app)
            .post('/api/contacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/contactbyuserid')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.contact.newtel1, mockup.contact.newtel1);
                        assert.equal(resp.data.contact.newtel2, mockup.contact.newtel2);
                        assert.equal(resp.data.contact.telhome, mockup.contact.telhome);
                        assert.equal(resp.data.contact.lineaccount1, mockup.contact.lineaccount1);
                        assert.equal(resp.data.contact.lineaccount2, mockup.contact.lineaccount2);
                        assert.equal(resp.data.contact.fbaccount, mockup.contact.fbaccount);
                        assert.equal(resp.data.contact.igaccount, mockup.contact.igaccount);
                        done();
                    });
            });
    });

    it('should be not have data then get data blank', function (done) {
        credentials = {
            username: '09924368022233',
            password: 'password',
            firstname: 'unknow',
            lastname: 'unknow',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });

        var contact1 = new Contact({
            "u_id": "099243680000",
            "contact": {
                "newtel1": "0960236211",
                "newtel2": "",
                "telhome": "",
                "lineaccount1": "rock.shit",
                "lineaccount2": "",
                "fbaccount": "krittin tch",
                "igaccount": "krittin tch"
            }
        });

        contact1.save(function (err, data) {
            request(app)
                .get('/api/contactbyuserid')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    var resp = res.body;
                    assert.equal(resp.data.u_id, "");
                    assert.equal(resp.data.contact.newtel1, "");
                    assert.equal(resp.data.contact.newtel2, "");
                    assert.equal(resp.data.contact.telhome, "");
                    assert.equal(resp.data.contact.lineaccount1, "");
                    assert.equal(resp.data.contact.lineaccount2, "");
                    assert.equal(resp.data.contact.fbaccount, "");
                    assert.equal(resp.data.contact.igaccount, "");
                    done();
                });
        })
    });

    afterEach(function (done) {
        Contact.remove().exec(done);
    });

});