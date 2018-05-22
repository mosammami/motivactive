var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Activity', function() {

    var url = 'http://localhost:3000',
        XSRFToken = null;

    describe('Create and delete activity', function() {

        var activity_id = null;

        it('should log in', function(done) {

            var body = {
                data: {
                    email: 'fred@mail.com',
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

        it('should create activity', function(done) {

            var body = {
                data: {
                    title:        "Need babysitter Sat and Sundays",
                    description:  "Hello,<br/>we are a family of four. Sally and Billy are 6 and 8 years old and love playing board games. We are looking for a reliable, fun, and friendly babysitter for saturdays and sundays on a regular basis. We can offer money or a bed in our guestroom with meals throughout the week.<br/>We'd love to hear from you!<br/>See you soon, Fred and Wilma.",
                    reward:       "Bed and Meals",
                    due_to:       "1527851039000",
                    repeated:     true,
                    volunteer_id: null
                }
            };

            request(url)
                .post('/api/activities/create')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.body.should.have.property('_id');

                    activity_id = res.body._id;

                    done();
                });
        });

        it('should delete activity', function(done) {

            var body = {
                data: {
                    _id: activity_id
                }
            };

            request(url)
                .post('/api/activities/delete')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    res.body.result.should.be.true();

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

    });


    describe('Create and delete activity', function() {

        var activity_id1 = null,
            activity_id2 = null,
            activity_id3 = null;

        it('should log in', function(done) {

            var body = {
                data: {
                    email: 'fred@mail.com',
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
                    
                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];

                    res.body.should.have.property('_id');

                    done();
                });
        });

        it('should create activity1', function(done) {

            var body = {
                data: {
                    title:        "Need babysitter Sat and Sundays",
                    description:  "Hello,<br/>we are a family of four. Sally and Billy are 6 and 8 years old and love playing board games. We are looking for a reliable, fun, and friendly babysitter for saturdays and sundays on a regular basis. We can offer money or a bed in our guestroom with meals throughout the week.<br/>We'd love to hear from you!<br/>See you soon, Fred and Wilma.",
                    reward:       "Bed and Meals",
                    due_to:       new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3).getTime(),
                    repeated:     true,
                    volunteer_id: null
                }
            };

            request(url)
                .post('/api/activities/create')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];

                    res.body.should.have.property('_id');
                    activity_id1 = res.body._id;

                    done();
                });
        });

        it('should create activity2', function(done) {

            var body = {
                data: {
                    title:        "You teach me English, I teach you Polish",
                    description:  "Hi! :) I am exchange student from Poland and want better my English. If you can teach me it would be much appreciated! In return, I teach you Polish. How you like that? See you.",
                    reward:       "Language Exchange",
                    due_to:       new Date().getTime(),
                    repeated:     true,
                    volunteer_id: null
                }
            };

            request(url)
                .post('/api/activities/create')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];
                    
                    res.body.should.have.property('_id');
                    activity_id2 = res.body._id;

                    done();
                });
        });

        it('should create activity3', function(done) {

            var body = {
                data: {
                    title:        "Help me with shopping",
                    description:  "Hello,<br/>my name is Hildegarde and I am looking for some young and friendly spirit that would do my groceries for me. I live quite far from the nearest store and busses are sparse. I'm afraid my age does not come in handy in this situation. In return I would be happy to provide you a free meal and some goodies whenever you go shopping for me. Best regards, Hildegarde.",
                    reward:       "Meals",
                    due_to:       new Date().getTime(),
                    repeated:     true,
                    volunteer_id: "5b0191376b6e1810d4a6c533"
                }
            };

            request(url)
                .post('/api/activities/create')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];

                    res.body.should.have.property('_id');
                    activity_id3 = res.body._id;

                    done();
                });
        });

        it('should find available activities', function(done) {

            var body = {
                data: {
                    volunteer_id: null
                }
            };

            request(url)
                .post('/api/activities/find')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];

                    res.body.should.have.size(4);

                    done();
                });
        });

        it('should delete activities', function(done) {

            request(url)
                .post('/api/activities/delete')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send({ data: { _id: activity_id1 }})
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;

                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];

                    res.body.result.should.be.true();

                    request(url)
                        .post('/api/activities/delete')
                        .set({ 'X-XSRF-TOKEN': XSRFToken,
                               'X-Requested-With': 'xmlhttprequest' })
                        .send({ data: { _id: activity_id2 }})
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) throw err;
                    
                            res.headers['x-xsrf-token'].should.exist;
                            XSRFToken = res.headers['x-xsrf-token'];

                            res.body.result.should.be.true();

                            request(url)
                                .post('/api/activities/delete')
                                .set({ 'X-XSRF-TOKEN': XSRFToken,
                                       'X-Requested-With': 'xmlhttprequest' })
                                .send({ data: { _id: activity_id3 }})
                                .expect('Content-Type', /json/)
                                .expect(200)
                                .end(function(err, res) {
                                    if (err) throw err;
                    
                                    res.headers['x-xsrf-token'].should.exist;
                                    XSRFToken = res.headers['x-xsrf-token'];

                                    res.body.result.should.be.true();

                                    done();
                                });
                        });
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
    });
});