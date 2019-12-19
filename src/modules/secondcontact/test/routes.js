'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Secondcontact = mongoose.model('Secondcontact');

var credentials,
    token,
    mockup;

describe('Secondcontact CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "u_id": "0992436806",
            "secondcontact": [
                {
                    "name": "ปฐมพร",
                    "lastname": "สุปัญญา",
                    "age": "",
                    "relation": "พ่อ",
                    "tel": "08000894635",
                    "job": "",
                    "salary": ""
                }
            ]
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

    it('should be Secondcontact get use token', (done) => {
        request(app)
            .get('/api/secondcontacts')
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

    it('should be Secondcontact get by id', function (done) {

        request(app)
            .post('/api/secondcontacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/secondcontacts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, mockup.u_id);
                        assert.equal(resp.data.secondcontact[0].name, mockup.secondcontact[0].name);
                        assert.equal(resp.data.secondcontact[0].lastname, mockup.secondcontact[0].lastname);
                        assert.equal(resp.data.secondcontact[0].age, mockup.secondcontact[0].age);
                        assert.equal(resp.data.secondcontact[0].relation, mockup.secondcontact[0].relation);
                        assert.equal(resp.data.secondcontact[0].tel, mockup.secondcontact[0].tel);
                        assert.equal(resp.data.secondcontact[0].job, mockup.secondcontact[0].job);
                        assert.equal(resp.data.secondcontact[0].salary, mockup.secondcontact[0].salary);
                        done();
                    });
            });

    });

    it('should be Secondcontact post use token', (done) => {
        request(app)
            .post('/api/secondcontacts')
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
                assert.equal(resp.data.secondcontact[0].name, mockup.secondcontact[0].name);
                assert.equal(resp.data.secondcontact[0].lastname, mockup.secondcontact[0].lastname);
                assert.equal(resp.data.secondcontact[0].age, mockup.secondcontact[0].age);
                assert.equal(resp.data.secondcontact[0].relation, mockup.secondcontact[0].relation);
                assert.equal(resp.data.secondcontact[0].tel, mockup.secondcontact[0].tel);
                assert.equal(resp.data.secondcontact[0].job, mockup.secondcontact[0].job);
                assert.equal(resp.data.secondcontact[0].salary, mockup.secondcontact[0].salary);
                done();
            });
    });

    it('should be secondcontact put use token', function (done) {

        request(app)
            .post('/api/secondcontacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "u_id": "0992436806",
                    "secondcontact": [
                        {
                            "name": "ปฐมพร",
                            "lastname": "สุปัญญา",
                            "age": "test",
                            "relation": "พ่อ",
                            "tel": "08000894635",
                            "job": "test",
                            "salary": "test"
                        }
                    ]
                }
                request(app)
                    .put('/api/secondcontacts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, mockup.u_id);
                        assert.equal(resp.data.secondcontact[0].name, update.secondcontact[0].name);
                        assert.equal(resp.data.secondcontact[0].lastname, update.secondcontact[0].lastname);
                        assert.equal(resp.data.secondcontact[0].age, update.secondcontact[0].age);
                        assert.equal(resp.data.secondcontact[0].relation, update.secondcontact[0].relation);
                        assert.equal(resp.data.secondcontact[0].tel, update.secondcontact[0].tel);
                        assert.equal(resp.data.secondcontact[0].job, update.secondcontact[0].job);
                        assert.equal(resp.data.secondcontact[0].salary, update.secondcontact[0].salary);
                        done();
                    });
            });

    });

    it('should be secondcontact delete use token', function (done) {

        request(app)
            .post('/api/secondcontacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/secondcontacts/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be secondcontact get not use token', (done) => {
        request(app)
            .get('/api/secondcontacts')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be secondcontact post not use token', function (done) {

        request(app)
            .post('/api/secondcontacts')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be secondcontact put not use token', function (done) {

        request(app)
            .post('/api/secondcontacts')
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
                    .put('/api/secondcontacts/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be secondcontact delete not use token', function (done) {

        request(app)
            .post('/api/secondcontacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/secondcontacts/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should have data and get secondContacts data', function (done) {
        request(app)
            .post('/api/secondcontacts')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body
                // console.log(resp.data.u_id)
                request(app)
                    .get('/api/secondcontactsbyuserid')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err)
                        }
                        var resp = res.body
                        assert.equal(resp.data.u_id, mockup.u_id)
                        assert.equal(resp.data.secondcontact[0].name, mockup.secondcontact[0].name);
                        assert.equal(resp.data.secondcontact[0].lastname, mockup.secondcontact[0].lastname);
                        assert.equal(resp.data.secondcontact[0].age, mockup.secondcontact[0].age);
                        assert.equal(resp.data.secondcontact[0].relation, mockup.secondcontact[0].relation);
                        assert.equal(resp.data.secondcontact[0].tel, mockup.secondcontact[0].tel);
                        assert.equal(resp.data.secondcontact[0].job, mockup.secondcontact[0].job);
                        assert.equal(resp.data.secondcontact[0].salary, mockup.secondcontact[0].salary);
                        done();
                    })
            })
    });

    it('should not have data and get blank data', function (done) {
        credentials = {
            username: '0992436807',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });

        var second1 = new Secondcontact({
            "u_id": "0992436806",
            "secondcontact": [
                {
                    "name": "ปฐมพร",
                    "lastname": "สุปัญญา",
                    "age": "",
                    "relation": "พ่อ",
                    "tel": "08000894635",
                    "job": "",
                    "salary": ""
                }
            ]
        });

        second1.save(function (err, data) {
            request(app)
                .get('/api/secondcontactsbyuserid')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err)
                    }
                    var resp = res.body
                    assert.equal(resp.data.u_id, "")
                    assert.equal(resp.data.secondcontact[0].name, "");
                    assert.equal(resp.data.secondcontact[0].lastname, "");
                    assert.equal(resp.data.secondcontact[0].age, "");
                    assert.equal(resp.data.secondcontact[0].relation, "");
                    assert.equal(resp.data.secondcontact[0].tel, "");
                    assert.equal(resp.data.secondcontact[0].job, "");
                    assert.equal(resp.data.secondcontact[0].salary, "");
                    done();
                })
        })
    });

    afterEach(function (done) {
        Secondcontact.remove().exec(done);
    });

});