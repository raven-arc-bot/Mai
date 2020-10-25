const { green, yellow, red, magenta, cyan } = require('chalk')
const mongoose = require('mongoose');
const connector = `mongodb+srv://Raven:${process.env.MAIDB}@cluster0.xn7sl.mongodb.net/<dbname>?retryWrites=true&w=majority`

module.exports = {
  init:() => {
    const dbOptions = {
      useUnifiedTopology:true,
      useNewUrlParser: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(connector,dbOptions)
    mongoose.set('useFindAndModify',false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on(`connecting`, () => {
      console.log(`${yellow('[Mai-WARN]')} : Connecting to MongoDB server...`)
    });

    mongoose.connection.on(`connected`, () => {
      console.log(`${green('[Mai-SUCCESS]')} : Mongoose connection established!`);
    });

    mongoose.connection.on('err', err => {
      console.error(`${red('[Mai-FAIL]')} : Mongoose connection error:\n ${err.stack}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(`${red('[Mai-FAIL]')} : Mongoose connection to MongoDB server disconnected!`);
    });

    mongoose.connection.on('reconnected', () => {
      console.log(`${green('[Mai-SUCCESS]')} : Mongoose connection to MongoDB server reconnected.`)
    });
  }
};
