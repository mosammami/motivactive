var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Users', function() {

    var url = 'http://localhost:3000',
        user_id = null,
        XSRFToken = null;

    describe('Normal User Account Management', function() {

        it('should create a new user', function(done) {

            var body = {
                data: {
                    first_name: 'sample',
                    last_name: 'sample',
                    password: 'password',
                    email: 'sample@test.com'
                }
            };

            request(url)
                .post('/api/users/create')
                .set({ 'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.should.have.property('_id');

                    user_id = res.body._id;

                    done();
                });
        });

        it('should log in', function(done) {

            var body = {
                data: {
                    email: 'sample@test.com',
                    password: 'password'
                }
            };

            request(url)
                .post('/api/users/login')
                .set({ 'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.should.have.property('_id');
                    res.headers['x-xsrf-token'].should.exist;

                    XSRFToken = res.headers['x-xsrf-token'];

                    done();
                });
        });

        it('should log out', function(done) {

            request(url)
                .post('/api/users/logout')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send()
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    res.body.closed.should.be.true();

                    done();
                });
        });

        it('should login and delete the user', function(done) {

            var body = {
                data: {
                    email: 'sample@test.com',
                    password: 'password'
                }
            };
            
            request(url)
                .post('/api/users/login')
                .set({ 'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.should.have.property('_id');
                    res.headers['x-xsrf-token'].should.exist;

                    XSRFToken = res.headers['x-xsrf-token'];

                    request(url)
                        .post('/api/users/delete')
                        .set({ 'X-XSRF-TOKEN': XSRFToken,
                               'X-Requested-With': 'xmlhttprequest' })
                        .send()
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) throw err;

                            res.body.result.should.be.true;

                            done();
                        });
                });

        });



    });
});