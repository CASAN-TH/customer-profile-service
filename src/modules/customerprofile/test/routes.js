'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Customerprofile = mongoose.model('Customerprofile');

var credentials,
    token,
    mockup;

describe('Customerprofile CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "frontcardimaged": {
                "url": "FrontCard.jpg"
            },
            "backcardimaged": {
                "url": "BackCard.jpg"
            },
            "personwithcardimaged": {
                "url": "PersonWithCard.jpg"
            },
            "citizen_id": "1103000082933",
            "citizenback_id": "meo-12345678",
            "name": "Nutshapon",
            "lastname": "lertlaosakunporn",
            "gender": "ชาย",
            "birthdate": "2019-09-20",
            "addressbycard": "13/301",
            "email": "nutnut@gamil.com",
            "address": "13/301 kukot lumlukka"
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

    it('should be Customerprofile get use token', (done) => {
        request(app)
            .get('/api/customerprofiles')
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

    it('should be Customerprofile get by id', function (done) {

        request(app)
            .post('/api/customerprofiles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/customerprofiles/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        done();
                    });
            });

    });

    it('should be Customerprofile post use token', (done) => {
        request(app)
            .post('/api/customerprofiles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                console.log(resp.data)
                assert.equal(resp.data.name, mockup.name);
                done();
            });
    });

    it('should be customerprofile put use token', function (done) {

        request(app)
            .post('/api/customerprofiles')
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
                    .put('/api/customerprofiles/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.name, update.name);
                        done();
                    });
            });

    });

    it('should be customerprofile delete use token', function (done) {

        request(app)
            .post('/api/customerprofiles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/customerprofiles/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be customerprofile get not use token', (done) => {
        request(app)
            .get('/api/customerprofiles')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be customerprofile post not use token', function (done) {

        request(app)
            .post('/api/customerprofiles')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be customerprofile put not use token', function (done) {

        request(app)
            .post('/api/customerprofiles')
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
                    .put('/api/customerprofiles/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be customerprofile delete not use token', function (done) {

        request(app)
            .post('/api/customerprofiles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/customerprofiles/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Customerprofile.remove().exec(done);
    });

});