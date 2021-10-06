require('module-alias/register');
const env = require('@env');

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('@middleware/cors');
const cors = require('cors');
const useragent = require('express-useragent');
const Records = require('@models/records');


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


// routes
app.get('/', (req, res) => res.end('Rapi (Records API) v1'));


// find (either from body or from url parameter)
// TODO: write all requests to a database, inserts, updates etc. => so we have logs what is happening.
app.get('/v1/:datasetId', async (req, res) => {
  const query = { dataset: req.params.datasetId };
  let limit = 10;
  if (req.query.limit && Number(req.query.limit) && Number(req.query.limit) <= 25) {
    limit = Number(req.query.limit);
  }

  let skip = 0;
  if (req.query.limit && Number(req.query.skip)) {
    skip = Number(req.query.skip);
  }

  // TODO: sort
  const data = [];
  const raw = await Records.find(query).lean().limit(limit).skip(skip).exec();
  for (let i = 0; i < raw.length; i += 1) {
    raw[i].data._id = raw[i]._id;
    raw[i].data.detailURL = `${env.rapiURL}/${req.params.datasetId}/${raw[i]._id}`;
    data.push(raw[i].data);
  }

  return res.json({
    data,
    query,
    metrics: {
      total: await Records.count(query).exec(),
    },
  });
});


// get single
// TODO: write all requests to a database, inserts, updates etc. => so we have logs what is happening.
app.get('/v1/:datasetId/:rid', async (req, res) => {
  const obj = await Records.findOne({ dataset: req.params.datasetId, _id: req.params.rid }).exec();

  // TODO: if object is not found. return better error.

  obj.data._id = obj._id;
  obj.data.createdAt = obj.createdAt;
  obj.data.updatedAt = obj.updatedAt;
  return res.json(obj.data);
});


// TODO: write all requests to a database, inserts, updates etc. => so we have logs what is happening.
// Keep changelog?
// TODO: soft delete? Or via changelog kunnen terug zetten?
app.delete('/v1/:datasetId/:rid', async (req, res) => {
  const obj = await Records.remove({ dataset: req.params.datasetId, _id: req.params.rid });
  return res.json(obj);
});

// TODO: write all requests to a database, inserts, updates etc. => so we have logs what is happening.
app.post('/v1/:datasetId', async (req, res) => {
  // TODO: validation
  const raw = await new Records({
    data: req.body || {},
    dataset: req.params.datasetId,
  }).save();
  const obj = await Records.findOne({ _id: raw._id }).lean().exec();
  obj.data._id = obj._id;
  return res.json(obj.data);
});

// TODO: write all requests to a database, inserts, updates etc. => so we have logs what is happening.
app.put('/v1/:datasetId/:rid', async (req, res) => {
  // TODO: validation
  const obj = await Records.update({ dataset: req.params.datasetId, _id: req.params.rid }, { $set: { data: req.body } });
  return res.json(obj);
});


app.use((req, res) => {
  res.status(404);
  return res.end('Page not found.');
});


app.use((err, req, res) => {
  // set locals, only providing error in development
  console.log(err);
  res.end('Error page');
});


app.listen(env.port, () => {
  console.log(`RAPI started on port ${env.port}`);
});
