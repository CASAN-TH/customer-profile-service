'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JobSchema = new Schema({
    u_id: {
        type: String
    },
    jobdata: {
        type: {
            jobtype: {
                type: String
            },
            student: {
                type: {
                    univarsal: {
                        type: String
                    },
                    faculty: {
                        type: String
                    },
                    majors: {
                        type: String
                    },
                    degree: {
                        type: String
                    },
                    level: {
                        type: String
                    },
                    studentimage: {
                        type: [{
                            url: {
                                type: String
                            }
                        }]
                    }
                }
            },
            other: {
                type: {
                    job: {
                        type: String
                    },
                    companyname: {
                        type: String
                    },
                    companytel: {
                        type: String
                    },
                    companylocation: {
                        type: String
                    },
                    companylocationdetail: {
                        type: String
                    },
                    experience: {
                        type: String
                    },
                    position: {
                        type: String
                    },
                    degree: {
                        type: String
                    },
                    salary: {
                        type: String
                    },
                    otherimage: {
                        type: [{
                            url: {
                                type: String
                            }
                        }]
                    }
                }
            }
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Job", JobSchema);