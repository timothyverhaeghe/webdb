require('module-alias/register');

const env = require('@env');
const Users = require('@models/users');
const Projects = require('@models/projects');

const mongoose = require('mongoose');
const prompt = require('prompt');


mongoose.Promise = global.Promise;
mongoose.connect(env.mongoURL, {
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err;
});

prompt.get([{
  name: 'firstname',
  description: 'Enter your firstname',
}, {
  name: 'lastname',
  description: 'Enter your lastname',
}, {
  name: 'email',
  description: 'Enter your email',
}], (err, result) => {
  if (err) console.log(err);

  // check if email is already registered
  Users.findOne({ email: result.email.toLowerCase() }).exec((err, user) => {
    if (err) console.log(err);
    if (user && user._id) {
      console.log('[Error] User already exists');
      process.exit();
    } else {
      new Users({
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
      }).save((err, user) => {
        if (err) console.log(err);

        new Projects({
          users: [{ user: user._id }],
          name: 'My first project',
        }).save();

        console.log('[LOG] User setup completed. You can now login.');
        process.exit();
      });
    }
  });
});
