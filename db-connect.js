const mongoose = require('mongoose');
const log = require('npmlog');

const connectDb = function(port){
    mongoose.connect(`mongodb://localhost:${port}/WorldRecords`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        log.info('database', 'Connected');
        log.info('db Port:', port);
    });
}

module.exports = connectDb;


