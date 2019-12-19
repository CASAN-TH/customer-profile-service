'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Assetdocs = mongoose.model('Assetdocs');

var credentials,
    token,
    mockup;

describe('Assetdocs CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "assetdocs": [
                {
                    "name": "เล่มทะเบียนรถยนต์",
                    "images": [
                        {
                            "url": "http://www.fab.co.th/images/services/document/ex/cardocin.jpg"
                        },
                        {
                            "url": "https://f.ptcdn.info/327/059/000/pdunxxs48pfwpv7r3lM-o.jpg"
                        }
                    ]
                },
                {
                    "name": "เล่มทะเบียนรถจักรยานยนต์",
                    "images": [
                        {
                            "url": "https://f.ptcdn.info/327/059/000/pdunxxs48pfwpv7r3lM-o.jpg"
                        }
                    ]
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

    it('should be Assetdocs get use token', (done) => {
        request(app)
            .get('/api/assetdocss')
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

    it('should be Assetdocs get by id', function (done) {

        request(app)
            .post('/api/assetdocss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/assetdocss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.assetdocs[0].name, mockup.assetdocs[0].name);
                        assert.equal(resp.data.assetdocs[0].images[0].url, mockup.assetdocs[0].images[0].url);
                        assert.equal(resp.data.assetdocs[0].images[1].url, mockup.assetdocs[0].images[1].url);
                        assert.equal(resp.data.assetdocs[1].name, mockup.assetdocs[1].name);
                        assert.equal(resp.data.assetdocs[1].images[0].url, mockup.assetdocs[1].images[0].url);
                        assert.equal(resp.data.assetdocs[2].name, mockup.assetdocs[2].name);
                        assert.equal(resp.data.assetdocs[3].name, mockup.assetdocs[3].name);
                        assert.equal(resp.data.assetdocs[4].name, mockup.assetdocs[4].name);
                        assert.equal(resp.data.assetdocs[5].name, mockup.assetdocs[5].name);
                        assert.equal(resp.data.assetdocs[6].name, mockup.assetdocs[6].name);
                        done();
                    });
            });

    });

    it('should be Assetdocs post use token', (done) => {
        request(app)
            .post('/api/assetdocss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.u_id, credentials.username);
                assert.equal(resp.data.assetdocs[0].name, mockup.assetdocs[0].name);
                assert.equal(resp.data.assetdocs[0].images[0].url, mockup.assetdocs[0].images[0].url);
                assert.equal(resp.data.assetdocs[0].images[1].url, mockup.assetdocs[0].images[1].url);
                assert.equal(resp.data.assetdocs[1].name, mockup.assetdocs[1].name);
                assert.equal(resp.data.assetdocs[1].images[0].url, mockup.assetdocs[1].images[0].url);
                assert.equal(resp.data.assetdocs[2].name, mockup.assetdocs[2].name);
                assert.equal(resp.data.assetdocs[3].name, mockup.assetdocs[3].name);
                assert.equal(resp.data.assetdocs[4].name, mockup.assetdocs[4].name);
                assert.equal(resp.data.assetdocs[5].name, mockup.assetdocs[5].name);
                assert.equal(resp.data.assetdocs[6].name, mockup.assetdocs[6].name);
                done();
            });
    });

    it('should be assetdocs put use token', function (done) {

        request(app)
            .post('/api/assetdocss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "assetdocs": [
                        {
                            "name": "update",
                            "images": [
                                {
                                    "url": "update.jpg"
                                },
                                {
                                    "url": "update2.jpg"
                                }
                            ]
                        },
                        {
                            "name": "เล่มทะเบียนรถจักรยานยนต์",
                            "images": [
                                {
                                    "url": "https://f.ptcdn.info/327/059/000/pdunxxs48pfwpv7r3lM-o.jpg"
                                }
                            ]
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
                            "name": "update",
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
                request(app)
                    .put('/api/assetdocss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.assetdocs[0].name, update.assetdocs[0].name);
                        assert.equal(resp.data.assetdocs[0].images[0].url, update.assetdocs[0].images[0].url);
                        assert.equal(resp.data.assetdocs[0].images[1].url, update.assetdocs[0].images[1].url);
                        assert.equal(resp.data.assetdocs[1].name, mockup.assetdocs[1].name);
                        assert.equal(resp.data.assetdocs[1].images[0].url, mockup.assetdocs[1].images[0].url);
                        assert.equal(resp.data.assetdocs[2].name, mockup.assetdocs[2].name);
                        assert.equal(resp.data.assetdocs[3].name, mockup.assetdocs[3].name);
                        assert.equal(resp.data.assetdocs[4].name, update.assetdocs[4].name);
                        assert.equal(resp.data.assetdocs[5].name, mockup.assetdocs[5].name);
                        assert.equal(resp.data.assetdocs[6].name, mockup.assetdocs[6].name);
                        done();
                    });
            });

    });

    it('should be assetdocs delete use token', function (done) {

        request(app)
            .post('/api/assetdocss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/assetdocss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be assetdocs get not use token', (done) => {
        request(app)
            .get('/api/assetdocss')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be assetdocs post not use token', function (done) {

        request(app)
            .post('/api/assetdocss')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be assetdocs put not use token', function (done) {

        request(app)
            .post('/api/assetdocss')
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
                    .put('/api/assetdocss/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be assetdocs delete not use token', function (done) {

        request(app)
            .post('/api/assetdocss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/assetdocss/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Assetdocs.remove().exec(done);
    });

});