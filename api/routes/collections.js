// Required Node packages
const express = require('express');
const Model = require('@models/collections');
const Auth = require('@middleware/auth');

// Required middleware/functions
const router = express.Router();

router.post('/', Auth.check, async (req, res) => {
  if (!req.body.name) {
    return res.json({
      error: 'Missing field (name)',
    });
  }
  req.body.project = req.user.project._id;
  console.log('Created new collection:', req.body.name);
  const raw = await new Model(req.body).save();
  const data = await Model.findOne({ _id: raw._id }).exec();
  res.json(data);
});


router.put('/:id', Auth.check, async (req, res) => {
  await Model.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.json({
    updated: true,
  });
});


router.get('/', Auth.check, async (req, res) => {
  const query = { project: req.user.project._id };

  if (req.query.q && req.query.q.length > 0) {
    query.$or = [
      { desc: { $regex: req.query.q, $options: 'i' } },
      { name: { $regex: req.query.q, $options: 'i' } },
    ];
  }


  const records = await Model.find(query).exec();
  res.json({
    data: records,
  });
});

// add authentification again...
router.get('/:id', async (req, res) => {
  const record = await Model.findOne({ _id: req.params.id }).lean().exec();

  if (!record.headers) record.headers = [];

  res.json(record);
});


router.delete('/:id', Auth.check, async (req, res) => {
  await Model.remove({ _id: req.params.id }).exec();
  res.json({
    removed: true,
  });
});


module.exports = router;
