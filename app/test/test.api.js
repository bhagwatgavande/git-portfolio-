const request = require('supertest');
const app = require('./api')

// API tests
describe('POST /api/register', function() {
it('Adds a task', function(done) {
// Use supertest to run assertions for our API
request(app)
.post('/api/register')
.send({ title: "API testing rocks!" })
.expect(201, done);
});
});
console.log('ok')