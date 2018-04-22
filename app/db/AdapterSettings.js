var config = {
    mongoose: {
        adapter: require('./mongoose/MongooseAdapter')
    }
}

module.exports = function(mode) {
    return config[mode] || config.mongoose;
}