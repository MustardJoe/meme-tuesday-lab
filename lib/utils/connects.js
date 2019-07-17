const mongoose = require('mongoose');
const { parse } = require('url');

module.exports = (url = process.env.MONGODB_URI) => {
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });

  mongoose.connection.on('connected', () => {
    const parsedURL = parse(url);
    const redactedURL = `${parsedURL.protocol}//${parsedURL.hostname}:${parsedURL.port}${parsedURL.pathname}`;
    console.log(`Connected to MongoDB at ${redactedURL}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('disconnected from MongoDB');
  });

  mongoose.connection.on('[error', () => {
    console.log('Error connecting to MongoDB');
  });
};
