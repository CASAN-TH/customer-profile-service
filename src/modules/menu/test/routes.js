'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Menu = mongoose.model('Menu');

var credentials,
    token,
    mockup;

describe('Menu CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "menus": [
                {
                    "name": "ข้อมูลผู้ติดต่อ",
                    "detail": "เพิ่มวงเงินได้สูงสุด B1000",
                    "image": "../../../assets/images/menu/contact.png"
                },
                {
                    "name": "สถานภาพสมรส",
                    "detail": "เพิ่มวงเงินได้สูงสุด B2200",
                    "image": "../../../assets/images/menu/marriage.png"
                },
                {
                    "name": "บุคคลติดต่อฉุกเฉิน",
                    "detail": "เพิ่มวงเงินได้สูงสุด B3000",
                    "image": "../../../assets/images/menu/second.png"
                },
                {
                    "name": "เอกสารสินทรัพย์",
                    "detail": "เพิ่มวงเงินได้สูงสุด B2000",
                    "image": "../../../assets/images/menu/asset.png"
                },
                {
                    "name": "ข้อมูลอาชีพ",
                    "detail": "เพิ่มวงเงินได้สูงสุด B5000",
                    "image": "../../../assets/images/menu/job.png"
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

    it('should be Menu get use token', (done) => {
        request(app)
            .get('/api/menus')
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

    it('should be Menu get by id', function (done) {

        request(app)
            .post('/api/menus')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/menus/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.menus[0].name, mockup.menus[0].name);
                        assert.equal(resp.data.menus[0].detail, mockup.menus[0].detail);
                        assert.equal(resp.data.menus[0].image, mockup.menus[0].image);
                        assert.equal(resp.data.menus[1].name, mockup.menus[1].name);
                        assert.equal(resp.data.menus[1].detail, mockup.menus[1].detail);
                        assert.equal(resp.data.menus[1].image, mockup.menus[1].image);
                        assert.equal(resp.data.menus[2].name, mockup.menus[2].name);
                        assert.equal(resp.data.menus[2].detail, mockup.menus[2].detail);
                        assert.equal(resp.data.menus[2].image, mockup.menus[2].image);
                        assert.equal(resp.data.menus[3].name, mockup.menus[3].name);
                        assert.equal(resp.data.menus[3].detail, mockup.menus[3].detail);
                        assert.equal(resp.data.menus[3].image, mockup.menus[3].image);
                        assert.equal(resp.data.menus[4].name, mockup.menus[4].name);
                        assert.equal(resp.data.menus[4].detail, mockup.menus[4].detail);
                        assert.equal(resp.data.menus[4].image, mockup.menus[4].image);
                        done();
                    });
            });

    });

    it('should be Menu post use token', (done) => {
        request(app)
            .post('/api/menus')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                // console.log(resp.data)
                assert.equal(resp.status, 200);
                assert.equal(resp.data.menus[0].name, mockup.menus[0].name);
                assert.equal(resp.data.menus[0].detail, mockup.menus[0].detail);
                assert.equal(resp.data.menus[0].image, mockup.menus[0].image);
                assert.equal(resp.data.menus[1].name, mockup.menus[1].name);
                assert.equal(resp.data.menus[1].detail, mockup.menus[1].detail);
                assert.equal(resp.data.menus[1].image, mockup.menus[1].image);
                assert.equal(resp.data.menus[2].name, mockup.menus[2].name);
                assert.equal(resp.data.menus[2].detail, mockup.menus[2].detail);
                assert.equal(resp.data.menus[2].image, mockup.menus[2].image);
                assert.equal(resp.data.menus[3].name, mockup.menus[3].name);
                assert.equal(resp.data.menus[3].detail, mockup.menus[3].detail);
                assert.equal(resp.data.menus[3].image, mockup.menus[3].image);
                assert.equal(resp.data.menus[4].name, mockup.menus[4].name);
                assert.equal(resp.data.menus[4].detail, mockup.menus[4].detail);
                assert.equal(resp.data.menus[4].image, mockup.menus[4].image);
                done();
            });
    });

    it('should be menu put use token', function (done) {

        request(app)
            .post('/api/menus')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "_id": resp.data.menus[0]._id,
                    "name": "Menu Update",
                    "detail": "เพิ่มวงเงินได้สูงสุด Update",
                    "image": "Update.jpg"
                }
                request(app)
                    .put('/api/menus/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.menus[0].name, update.name);
                        assert.equal(resp.data.menus[0].detail, update.detail);
                        assert.equal(resp.data.menus[0].image, update.image);
                        assert.equal(resp.data.menus[1].name, mockup.menus[1].name);
                        assert.equal(resp.data.menus[1].detail, mockup.menus[1].detail);
                        assert.equal(resp.data.menus[1].image, mockup.menus[1].image);
                        assert.equal(resp.data.menus[2].name, mockup.menus[2].name);
                        assert.equal(resp.data.menus[2].detail, mockup.menus[2].detail);
                        assert.equal(resp.data.menus[2].image, mockup.menus[2].image);
                        assert.equal(resp.data.menus[3].name, mockup.menus[3].name);
                        assert.equal(resp.data.menus[3].detail, mockup.menus[3].detail);
                        assert.equal(resp.data.menus[3].image, mockup.menus[3].image);
                        assert.equal(resp.data.menus[4].name, mockup.menus[4].name);
                        assert.equal(resp.data.menus[4].detail, mockup.menus[4].detail);
                        assert.equal(resp.data.menus[4].image, mockup.menus[4].image);
                        done();
                    });
            });

    });

    it('should be menu delete use token', function (done) {

        request(app)
            .post('/api/menus')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/menus/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be menu get not use token', (done) => {
        request(app)
            .get('/api/menus')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be menu post not use token', function (done) {

        request(app)
            .post('/api/menus')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be menu put not use token', function (done) {

        request(app)
            .post('/api/menus')
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
                    .put('/api/menus/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be menu delete not use token', function (done) {

        request(app)
            .post('/api/menus')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/menus/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Menu.remove().exec(done);
    });

});