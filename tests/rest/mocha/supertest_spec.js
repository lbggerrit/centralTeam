var expect = require('chai').expect,
	supertest = require('supertest'),
	api = supertest('http://localhost:3000');

describe('The REST end point /api/hello/foo', function() {
	it('returns a 200 response code', function(done) {
		api.get('/api/hello/foo')
			.end(function(err, res) {
				if (err) {
					return done(err);
				}
				expect(res.statusCode).to.equal(200);
				done();
			});
	});
	it('returns "Hello foo"', function(done) {
		api.get('/api/hello/foo')
			.end(function(err, res) {
				if (err) {
					return done(err);
				}
				expect(res.text).to.equal('Hello foo');
				done();
			});
	});
});
