var
	request = require('request'),
	helloBarRestEndPoint = 'http://localhost:3000/api/hello/bar';

describe('The REST end point /api/hello/bar', function() {
	it('returns a 200 response code', function(done) {
		request.get(helloBarRestEndPoint, function(error, response, body) {
			expect(response.statusCode).toBe(200);
			done();
		});
	});

	it('returns Hello World', function(done) {
		request.get(helloBarRestEndPoint, function(error, response, body) {
			expect(body).toBe('Hello bar');
			done();
		});
	});
});
