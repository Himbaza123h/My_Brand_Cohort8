describe('requestTime middleware', function (){


    // Test must be here

const assert = require('assert');
const requestTime = require('../lib/request-time');

describe('requestTime middleware', function(){
    it('should add a `requestTime` property to the `req` parameter');
    const req = {};
    requestTime(req);
    assert.ok(req.requestTime > 0);
});


});

module.exports =(req, res, next) =>{
    req.requestTime = Date.now();
    next();
};