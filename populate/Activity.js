var should = require('should');
var assert = require('assert');
var request = require('supertest');

var activities = [
    {
        'title':        "Repair my broken iPhone screen",
        'description':  "I need someone to repair my broken iPhone screen. I've got all the materials but a screwdriver. I can also do it myself, just need the screwdriver. Thanks :)",
        'reward':       "Karma",
        'due_to':       new Date().getTime(),
        'repeated':     false,
        'volunteer_id': null,
        'categories':   ["Other", "Community"]
    },
    {
        'title':        "You teach me English, I teach you Polish",
        'description':  "Hi! :) I am exchange student from Poland and want better my English. If you can teach me it would be much appreciated! In return, I teach you Polish. How you like that? See you.",
        'reward':       "Language Exchange",
        'due_to':       new Date().getTime(),
        'repeated':     true,
        'volunteer_id': null,
        'categories':   ["Schooling", "Community"]
    },
    {
        'title':        "Help me with shopping",
        'description':  "Hello,<br/>my name is Hildegarde and I am looking for some young and friendly spirit that would do my groceries for me. I live quite far from the nearest store and busses are sparse. I'm afraid my age does not come in handy in this situation. In return I would be happy to provide you a free meal and some goodies whenever you go shopping for me. Best regards, Hildegarde.",
        'reward':       "Meals",
        'due_to':       new Date().getTime(),
        'repeated':     true,
        'volunteer_id': null,
        'categories':   ["Daily", "Community"]
    },
    {
        'title':        "Mow our lawn",
        'description':  "We've got a small lawn that needs mowing. In exchange you can use our mower for your own lawn.",
        'reward':       "Use our mower",
        'due_to':       new Date().getTime(),
        'repeated':     true,
        'volunteer_id': null,
        'categories':   ["Gardening"]
    },
    {
        'title':        "I want to learn Spanish",
        'description':  "Hi! :) I just moved to Spain and want better my Spanish. If you can teach me it would be much appreciated! I can speak very good English and French and can teach you some if you like.",
        'reward':       "Language Exchange and Friendship",
        'due_to':       new Date().getTime(),
        'repeated':     true,
        'volunteer_id': null,
        'categories':   ["Schooling", "Community"]
    },
    {
        'title':        "Care for our horse",
        'description':  "My husband and I will be going on holidays for three weeks. During that time we need someone to care for our horse Stacy. It would be good if you had experience with that, but if not, it's no problem. We are happy to teach you everything you need to know. You can also take Stacy out for a ride yourself if you like.",
        'reward':       "Fun with Horses",
        'due_to':       new Date(new Date().getTime() + 1000 * 60 * 60 * 22 * 6).getTime(),
        'repeated':     true,
        'volunteer_id': null,
        'categories':   ["Household", "Community", "Daily", "Other"]
    },
    {
        'title':        "Need babysitter Sat and Sundays",
        'description':  "Hello,<br/>we are a family of four. Sally and Billy are 6 and 8 years old and love playing board games. We are looking for a reliable, fun, and friendly babysitter for saturdays and sundays on a regular basis. We can offer money or a bed in our guestroom with meals throughout the week.<br/>We'd love to hear from you!<br/>See you soon, Fred and Wilma.",
        'reward':       "Bed and Meals",
        'due_to':       new Date(new Date().getTime() + 1000 * 60 * 60 * 20 * 3).getTime(),
        'repeated':     true,
        'volunteer_id': null,
        'categories':   ["Household", "Community", "Daily"]
    },
    {
        'title':        "Pick up furniture from IKEA",
        'description':  "I just moved to this city and need some friendly neighbor to transport my new furniture from IKEA to my new home. In exchange you'll get to know some friendly folks and a palette of beer (that you may share with us in the evening). Thanks :)))",
        'reward':       "Beverage",
        'due_to':       new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4).getTime(),
        'repeated':     false,
        'volunteer_id': null,
        'categories':   ["Other", "Community"]
    },
    {
        'title':        "In need of a strong hand for shed renovation",
        'description':  "We decided to renovate our garden shed into something nice for cosy evenings in the garden. I'm a carpenter and looking for a strong hand who would like to help me in their free time. I can teach you some carpenter skills if you're interested and you can use my wood working tools in my garage if you'd like",
        'reward':       "Knowledge, Tools and Beverage",
        'due_to':       new Date(new Date().getTime() + 1000 * 60 * 60 * 23 * 5).getTime(),
        'repeated':     false,
        'volunteer_id': null,
        'categories':   ["Other"]
    },
    {
        'title':        "House cleaning and Garden work",
        'description':  "I live in a big house with a big garden and need help with this work as it's too much for me and my work. I have a free guestroom which you can use in exchange.",
        'reward':       "Bed and Breakfast",
        'due_to':       new Date(new Date().getTime() + 1000 * 60 * 60 * 23 * 2).getTime(),
        'repeated':     false,
        'volunteer_id': null,
        'categories':   ["Household", "Gardening"]
    }
];

describe('Activity', function() {

    var url = 'http://localhost:3000',
        XSRFToken = null;

    describe('Create Activities', function() {

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

        it('should create activities', function(done) {

            var body = {
                data: activities
            };

            request(url)
                .post('/api/activities/createMany')
                .set({ 'X-XSRF-TOKEN': XSRFToken,
                       'X-Requested-With': 'xmlhttprequest' })
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) throw err;
                    
                    res.headers['x-xsrf-token'].should.exist;
                    XSRFToken = res.headers['x-xsrf-token'];
                    
                    res.body.should.have.length(activities.length);

                    done();
                });
        }).timeout(99999);;

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