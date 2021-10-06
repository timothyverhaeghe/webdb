// Required Node packages
const express = require('express');
const Model = require('@models/projects');
const Users = require('@models/users');
const Auth = require('@middleware/auth');

// Required middleware/functions
const router = express.Router();

router.post('/', Auth.check, async (req, res) => {
  if (!req.body.name) {
    return res.json({
      error: 'Missing field (name)',
    });
  }
  req.body.users = [{ user: req.user._id, role: 'ADMIN' }];
  console.log('Created new project:', req.body.name);
  console.log(req.body);
  const raw = await new Model(req.body).save();
  const data = await Model.findOne({ _id: raw._id }).exec();
  res.json(data);
});


router.put('/:id', Auth.check, async (req, res) => {
  console.log(req.body);
  await Model.updateOne({ _id: req.params.id }, { $set: req.body }).exec();
  res.json({
    updated: true,
  });
});


router.get('/', Auth.check, async (req, res) => {
  const records = await Model.find({ 'users.user': req.user._id }).exec();
  res.json({
    data: records,
  });
});

// add authentification again...
router.get('/:id', async (req, res) => {
  const record = await Model.findOne({ _id: req.params.id }).populate('users.user').exec();
  res.json(record);
});


router.delete('/:id', Auth.check, async (req, res) => {
  await Model.remove({ _id: req.params.id }).exec();
  res.json({
    removed: true,
  });
});


router.post('/:id/team', Auth.check, async (req, res) => {
  const project = await Model.findOne({ _id: req.params.id }).exec();
  if (!project || !project._id) {
    return res.json({
      error: 'Incorrect project',
    });
  }

  const email = req.body.email.toString().toLowerCase();

  if (!email || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    return res.json({ error: 'Incorrect email' });
  }

  // check if already a user
  const prevUser = await Users.findOne({ email }).exec();
  if (prevUser && prevUser._id) {
    // check if already in this team.
    let found = false;
    for (let i = 0; i < project.users.length; i += 1) {
      if (project.users[i].user === prevUser._id) {
        found = true;
        break;
      }
    }

    if (found) {
      console.log('[LOG] user already in this project.');
      return res.json({ error: 'user already in this project.' });
    }
    await Model.update({ _id: req.params.id }, { $addToSet: { users: { user: prevUser._id, role: 'ADMIN' } } });
    return res.json(prevUser);
  }

  const record = await new Users({ firstname: req.body.firstname, lastname: req.body.lastname, email }).save();
  console.log('record:', record);
  await Model.update({ _id: req.params.id }, { $addToSet: { users: { user: record._id, role: 'ADMIN' } } });
  const data = await Users.findOne({ _id: record._id }).exec();

  // TODO: sent email

  res.json(data);
});


router.delete('/:projectId/project/:id', Auth.check, async (req, res) => {
  const project = await Model.findOne({ _id: req.params.projectId }).exec();
  if (!project || !project._id) {
    console.log('Incorrect project');
    return res.json({
      error: 'Incorrect project',
    });
  }

  const members = [];
  for (let i = 0; i < project.users.length; i += 1) {
    if (project.users[i]._id.toString() !== req.params.id) {
      members.push(project.users[i]);
    }
  }

  await Model.update({ _id: req.params.projectId }, { $set: { users: members } }).exec();
  res.json({ ok: true });
});


module.exports = router;
