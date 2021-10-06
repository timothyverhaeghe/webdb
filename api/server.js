require('module-alias/register');
const env = require('@env');

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('@middleware/cors');
const useragent = require('express-useragent');
const cdn = require('@middleware/cdn');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(useragent.express());

mongoose.Promise = global.Promise;
mongoose.connect(env.mongoURL, {
  useMongoClient: true,
}, (err) => {
  if (err) throw err;
});

cdn.init({ cdn: env.cdnURL, token: env.cdnToken });

// routes
app.get('/', (req, res) => {
  res.end('Webdatabase.io API v1');
});

app.use('/v1/users', require('./routes/users'));
app.use('/v1/projects', require('./routes/projects'));
app.use('/v1/collections', require('./routes/collections'));


app.use((req, res) => {
  res.status(404);
  res.end('Page not found.');
});


app.use((err, req, res) => {
  // set locals, only providing error in development
  console.log(err);
  res.end('Error page');
});


app.listen(env.port, () => {
  console.log(`WebDatabase API started on port ${env.port}`);
});
