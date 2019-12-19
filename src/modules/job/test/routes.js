'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Job = mongoose.model('Job');

var credentials,
    token,
    mockup;

describe('Job CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            "jobdata": {
                "jobtype": "other",
                "student": {
                    "univarsal": "",
                    "faculty": "",
                    "majors": "",
                    "degree": "",
                    "level": "",
                    "studentimage": [
                        {
                            "url": ""
                        }
                    ]
                },
                "other": {
                    "job": "พนักงานไอที",
                    "companyname": "CASAN",
                    "companytel": "0233366897",
                    "companylocation": "ปทุมธานี",
                    "companylocationdetail": "หมู่บ้านคาซ่า",
                    "experience": "4",
                    "position": "developer",
                    "degree": "super",
                    "salary": "14000",
                    "otherimage": [
                        {
                            "url": "test.jpg"
                        }
                    ]
                }
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

    it('should be Job get use token', (done) => {
        request(app)
            .get('/api/jobs')
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

    it('should be Job get by id', function (done) {

        request(app)
            .post('/api/jobs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/jobs/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.jobdata.jobtype, mockup.jobdata.jobtype);
                        assert.equal(resp.data.jobdata.student.univarsal, mockup.jobdata.student.univarsal);
                        assert.equal(resp.data.jobdata.student.faculty, mockup.jobdata.student.faculty);
                        assert.equal(resp.data.jobdata.student.majors, mockup.jobdata.student.majors);
                        assert.equal(resp.data.jobdata.student.degree, mockup.jobdata.student.degree);
                        assert.equal(resp.data.jobdata.student.level, mockup.jobdata.student.level);
                        assert.equal(resp.data.jobdata.student.studentimage[0].url, mockup.jobdata.student.studentimage[0].url);
                        assert.equal(resp.data.jobdata.other.job, mockup.jobdata.other.job);
                        assert.equal(resp.data.jobdata.other.companyname, mockup.jobdata.other.companyname);
                        assert.equal(resp.data.jobdata.other.companytel, mockup.jobdata.other.companytel);
                        assert.equal(resp.data.jobdata.other.companylocation, mockup.jobdata.other.companylocation);
                        assert.equal(resp.data.jobdata.other.companylocationdetail, mockup.jobdata.other.companylocationdetail);
                        assert.equal(resp.data.jobdata.other.experience, mockup.jobdata.other.experience);
                        assert.equal(resp.data.jobdata.other.position, mockup.jobdata.other.position);
                        assert.equal(resp.data.jobdata.other.degree, mockup.jobdata.other.degree);
                        assert.equal(resp.data.jobdata.other.salary, mockup.jobdata.other.salary);
                        assert.equal(resp.data.jobdata.other.otherimage[0].url, mockup.jobdata.other.otherimage[0].url);
                        done();
                    });
            });

    });

    it('should be Job post use token', (done) => {
        request(app)
            .post('/api/jobs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.u_id, credentials.username);
                assert.equal(resp.data.jobdata.jobtype, mockup.jobdata.jobtype);
                assert.equal(resp.data.jobdata.student.univarsal, mockup.jobdata.student.univarsal);
                assert.equal(resp.data.jobdata.student.faculty, mockup.jobdata.student.faculty);
                assert.equal(resp.data.jobdata.student.majors, mockup.jobdata.student.majors);
                assert.equal(resp.data.jobdata.student.degree, mockup.jobdata.student.degree);
                assert.equal(resp.data.jobdata.student.level, mockup.jobdata.student.level);
                assert.equal(resp.data.jobdata.student.studentimage[0].url, mockup.jobdata.student.studentimage[0].url);
                assert.equal(resp.data.jobdata.other.job, mockup.jobdata.other.job);
                assert.equal(resp.data.jobdata.other.companyname, mockup.jobdata.other.companyname);
                assert.equal(resp.data.jobdata.other.companytel, mockup.jobdata.other.companytel);
                assert.equal(resp.data.jobdata.other.companylocation, mockup.jobdata.other.companylocation);
                assert.equal(resp.data.jobdata.other.companylocationdetail, mockup.jobdata.other.companylocationdetail);
                assert.equal(resp.data.jobdata.other.experience, mockup.jobdata.other.experience);
                assert.equal(resp.data.jobdata.other.position, mockup.jobdata.other.position);
                assert.equal(resp.data.jobdata.other.degree, mockup.jobdata.other.degree);
                assert.equal(resp.data.jobdata.other.salary, mockup.jobdata.other.salary);
                assert.equal(resp.data.jobdata.other.otherimage[0].url, mockup.jobdata.other.otherimage[0].url);
                done();
            });
    });

    it('should be job put use token', function (done) {

        request(app)
            .post('/api/jobs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    "jobdata": {
                        "jobtype": "other",
                        "student": {
                            "univarsal": "update",
                            "faculty": "update",
                            "majors": "update",
                            "degree": "update",
                            "level": "update",
                            "studentimage": [
                                {
                                    "url": "update.jpg"
                                }
                            ]
                        },
                        "other": {
                            "job": "พนักงานไอที update",
                            "companyname": "CASAN",
                            "companytel": "0233366897 update",
                            "companylocation": "ปทุมธานี update",
                            "companylocationdetail": "หมู่บ้านคาซ่า",
                            "experience": "4 update",
                            "position": "developer update",
                            "degree": "super update",
                            "salary": "14000",
                            "otherimage": [
                                {
                                    "url": "testupdate.jpg"
                                }
                            ]
                        }
                    }
                }
                request(app)
                    .put('/api/jobs/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.jobdata.jobtype, update.jobdata.jobtype);
                        assert.equal(resp.data.jobdata.student.univarsal, update.jobdata.student.univarsal);
                        assert.equal(resp.data.jobdata.student.faculty, update.jobdata.student.faculty);
                        assert.equal(resp.data.jobdata.student.majors, update.jobdata.student.majors);
                        assert.equal(resp.data.jobdata.student.degree, update.jobdata.student.degree);
                        assert.equal(resp.data.jobdata.student.level, update.jobdata.student.level);
                        assert.equal(resp.data.jobdata.student.studentimage[0].url, update.jobdata.student.studentimage[0].url);
                        assert.equal(resp.data.jobdata.other.job, update.jobdata.other.job);
                        assert.equal(resp.data.jobdata.other.companyname, update.jobdata.other.companyname);
                        assert.equal(resp.data.jobdata.other.companytel, update.jobdata.other.companytel);
                        assert.equal(resp.data.jobdata.other.companylocation, update.jobdata.other.companylocation);
                        assert.equal(resp.data.jobdata.other.companylocationdetail, update.jobdata.other.companylocationdetail);
                        assert.equal(resp.data.jobdata.other.experience, update.jobdata.other.experience);
                        assert.equal(resp.data.jobdata.other.position, update.jobdata.other.position);
                        assert.equal(resp.data.jobdata.other.degree, update.jobdata.other.degree);
                        assert.equal(resp.data.jobdata.other.salary, update.jobdata.other.salary);
                        assert.equal(resp.data.jobdata.other.otherimage[0].url, update.jobdata.other.otherimage[0].url);
                        done();
                    });
            });

    });

    it('should be job delete use token', function (done) {

        request(app)
            .post('/api/jobs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/jobs/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be job get not use token', (done) => {
        request(app)
            .get('/api/jobs')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be job post not use token', function (done) {

        request(app)
            .post('/api/jobs')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be job put not use token', function (done) {

        request(app)
            .post('/api/jobs')
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
                    .put('/api/jobs/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be job delete not use token', function (done) {

        request(app)
            .post('/api/jobs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/jobs/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be have Job data and get data by UserId', function (done) {
        request(app)
            .post('/api/jobs')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/jobbyuserid')
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.u_id, credentials.username);
                        assert.equal(resp.data.jobdata.jobtype, mockup.jobdata.jobtype);
                        assert.equal(resp.data.jobdata.student.univarsal, mockup.jobdata.student.univarsal);
                        assert.equal(resp.data.jobdata.student.faculty, mockup.jobdata.student.faculty);
                        assert.equal(resp.data.jobdata.student.majors, mockup.jobdata.student.majors);
                        assert.equal(resp.data.jobdata.student.degree, mockup.jobdata.student.degree);
                        assert.equal(resp.data.jobdata.student.level, mockup.jobdata.student.level);
                        assert.equal(resp.data.jobdata.student.studentimage[0].url, mockup.jobdata.student.studentimage[0].url);
                        assert.equal(resp.data.jobdata.other.job, mockup.jobdata.other.job);
                        assert.equal(resp.data.jobdata.other.companyname, mockup.jobdata.other.companyname);
                        assert.equal(resp.data.jobdata.other.companytel, mockup.jobdata.other.companytel);
                        assert.equal(resp.data.jobdata.other.companylocation, mockup.jobdata.other.companylocation);
                        assert.equal(resp.data.jobdata.other.companylocationdetail, mockup.jobdata.other.companylocationdetail);
                        assert.equal(resp.data.jobdata.other.experience, mockup.jobdata.other.experience);
                        assert.equal(resp.data.jobdata.other.position, mockup.jobdata.other.position);
                        assert.equal(resp.data.jobdata.other.degree, mockup.jobdata.other.degree);
                        assert.equal(resp.data.jobdata.other.salary, mockup.jobdata.other.salary);
                        assert.equal(resp.data.jobdata.other.otherimage[0].url, mockup.jobdata.other.otherimage[0].url);
                        done();
                    });
            });
    });

    it('should be not have Job data then get data blank', function (done) {
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

        var job1 = new Job({
            "u_id": "099243680000",
            "jobdata": {
                "jobtype": "other",
                "student": {
                    "univarsal": "",
                    "faculty": "",
                    "majors": "",
                    "degree": "",
                    "level": "",
                    "studentimage": [
                        {
                            "url": ""
                        }
                    ]
                },
                "other": {
                    "job": "พนักงานไอที",
                    "companyname": "CASAN",
                    "companytel": "0233366897",
                    "companylocation": "ปทุมธานี",
                    "companylocationdetail": "หมู่บ้านคาซ่า",
                    "experience": "4",
                    "position": "developer",
                    "degree": "super",
                    "salary": "14000",
                    "otherimage": [
                        {
                            "url": "test.jpg"
                        }
                    ]
                }
            }
        });

        job1.save(function (err, data) {
            request(app)
                .get('/api/jobbyuserid')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    var resp = res.body;
                    assert.equal(resp.data.u_id, "");
                    assert.equal(resp.data.jobdata.jobtype, "");
                    assert.equal(resp.data.jobdata.student.univarsal, "");
                    assert.equal(resp.data.jobdata.student.faculty, "");
                    assert.equal(resp.data.jobdata.student.majors, "");
                    assert.equal(resp.data.jobdata.student.degree, "");
                    assert.equal(resp.data.jobdata.student.level, "");
                    assert.equal(resp.data.jobdata.student.studentimage[0].url, "");
                    assert.equal(resp.data.jobdata.other.job, "");
                    assert.equal(resp.data.jobdata.other.companyname, "");
                    assert.equal(resp.data.jobdata.other.companytel, "");
                    assert.equal(resp.data.jobdata.other.companylocation, "");
                    assert.equal(resp.data.jobdata.other.companylocationdetail, "");
                    assert.equal(resp.data.jobdata.other.experience, "");
                    assert.equal(resp.data.jobdata.other.position, "");
                    assert.equal(resp.data.jobdata.other.degree, "");
                    assert.equal(resp.data.jobdata.other.salary, "");
                    assert.equal(resp.data.jobdata.other.otherimage[0].url, "");
                    done();
                });
        })
    });

    afterEach(function (done) {
        Job.remove().exec(done);
    });

});