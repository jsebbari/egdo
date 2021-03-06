var mongoose = require('mongoose');

require('dotenv').config();

// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// --------------------- BDD -----------------------------------------------------
mongoose.connect(`mongodb+srv://${process.env.ID_BDD}:${process.env.PASSWORD_BDD}@cluster0.ifwas.mongodb.net/egdo?retryWrites=true&w=majority`,
    options,
    function (err) {
        if (err) {
            console.log(`error, failed to connect to the database because --> ${err}`);
        } else {
            console.info('*** Database EGDO connection : Success ***');
        }
    }
);