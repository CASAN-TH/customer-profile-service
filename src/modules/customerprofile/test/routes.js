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
            "u_id": "0992436806",
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
            username: '0992436806',
            password: 'password',
            firstname: 'unknow',
            lastname: 'unknow',
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
                        assert.equal(resp.data.frontcardimaged.url, mockup.frontcardimaged.url);
                        assert.equal(resp.data.backcardimaged.url, mockup.backcardimaged.url);
                        assert.equal(resp.data.personwithcardimaged.url, mockup.personwithcardimaged.url);
                        assert.equal(resp.data.citizen_id, mockup.citizen_id);
                        assert.equal(resp.data.citizenback_id, mockup.citizenback_id);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.lastname, mockup.lastname);
                        assert.equal(resp.data.gender, mockup.gender);
                        assert.equal(resp.data.birthdate, mockup.birthdate);
                        assert.equal(resp.data.addressbycard, mockup.addressbycard);
                        assert.equal(resp.data.email, mockup.email);
                        assert.equal(resp.data.address, mockup.address);
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
                // console.log(resp.data)
                assert.equal(resp.data.frontcardimaged.url, mockup.frontcardimaged.url);
                assert.equal(resp.data.backcardimaged.url, mockup.backcardimaged.url);
                assert.equal(resp.data.personwithcardimaged.url, mockup.personwithcardimaged.url);
                assert.equal(resp.data.citizen_id, mockup.citizen_id);
                assert.equal(resp.data.citizenback_id, mockup.citizenback_id);
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.lastname, mockup.lastname);
                assert.equal(resp.data.gender, mockup.gender);
                assert.equal(resp.data.birthdate, mockup.birthdate);
                assert.equal(resp.data.addressbycard, mockup.addressbycard);
                assert.equal(resp.data.email, mockup.email);
                assert.equal(resp.data.address, mockup.address);
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
                    "frontcardimaged": {
                        "url": "updatefront.jpg"
                    },
                    "backcardimaged": {
                        "url": "updateback.jpg"
                    },
                    "personwithcardimaged": {
                        "url": "updateperson.jpg"
                    },
                    "citizen_id": "1103000082933 update",
                    "citizenback_id": "meo-12345678 update",
                    "name": "Nutshapon update",
                    "lastname": "lertlaosakunporn update",
                    "gender": "ชาย update",
                    "birthdate": "2019-09-20 update",
                    "addressbycard": "13/301 update",
                    "email": "nutnut@gamil.com update",
                    "address": "13/301 kukot lumlukka update"
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
                        assert.equal(resp.data.frontcardimaged.url, update.frontcardimaged.url);
                        assert.equal(resp.data.backcardimaged.url, update.backcardimaged.url);
                        assert.equal(resp.data.personwithcardimaged.url, update.personwithcardimaged.url);
                        assert.equal(resp.data.citizen_id, update.citizen_id);
                        assert.equal(resp.data.citizenback_id, update.citizenback_id);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.lastname, update.lastname);
                        assert.equal(resp.data.gender, update.gender);
                        assert.equal(resp.data.birthdate, update.birthdate);
                        assert.equal(resp.data.addressbycard, update.addressbycard);
                        assert.equal(resp.data.email, update.email);
                        assert.equal(resp.data.address, update.address);
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

    it('should be have data and get data by UserId', function (done) {
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
                    .get('/api/cusprofilesbyuserid/' + resp.data.u_id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.frontcardimaged.url, mockup.frontcardimaged.url);
                        assert.equal(resp.data.backcardimaged.url, mockup.backcardimaged.url);
                        assert.equal(resp.data.personwithcardimaged.url, mockup.personwithcardimaged.url);
                        assert.equal(resp.data.citizen_id, mockup.citizen_id);
                        assert.equal(resp.data.citizenback_id, mockup.citizenback_id);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.lastname, mockup.lastname);
                        assert.equal(resp.data.gender, mockup.gender);
                        assert.equal(resp.data.birthdate, mockup.birthdate);
                        assert.equal(resp.data.addressbycard, mockup.addressbycard);
                        assert.equal(resp.data.email, mockup.email);
                        assert.equal(resp.data.address, mockup.address);
                        done();
                    });
            });
    });

    it('should be not have data then get data blank', function (done) {
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
                    .get('/api/cusprofilesbyuserid/' + '123456789')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.frontcardimaged.url, "");
                        assert.equal(resp.data.backcardimaged.url, "");
                        assert.equal(resp.data.personwithcardimaged.url, "");
                        assert.equal(resp.data.citizen_id, "");
                        assert.equal(resp.data.citizenback_id, "");
                        assert.equal(resp.data.name, "");
                        assert.equal(resp.data.lastname, "");
                        assert.equal(resp.data.gender, "");
                        assert.equal(resp.data.birthdate, "");
                        assert.equal(resp.data.addressbycard, "");
                        assert.equal(resp.data.email, "");
                        assert.equal(resp.data.address, "");
                        done();
                    });
            });
    });

    afterEach(function (done) {
        Customerprofile.remove().exec(done);
    });

});