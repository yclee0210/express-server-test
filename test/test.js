const assert = require('assert');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;
const ENV = require('./environment.test');

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});

describe('Chai', function () {
    it('should...', function () {
        let foo = 'bar',
            beverages = {tea: ['chai', 'matcha', 'oolong']};

        expect(foo).to.be.a('string');
        expect(foo).to.equal('bar');
        expect(foo).to.have.lengthOf(3);
        expect(beverages).to.have.property('tea').with.lengthOf(3);
    });
});

describe('API test', function () {
    let server;
    beforeEach(function () {
        server = require('../app/server')(ENV);
    });
    afterEach(function (done) {
        console.log('after each');
        server.close(done);
    });
    describe('GET /', function () {
        it('should return Hello World', function (done) {
            request(server)
                .get('/')
                .expect(200, done);
        });

        it('should return 404 on everything else', function (done) {
            request(server)
                .get('/foo/bar')
                .expect(404, done);
        });
    });
});