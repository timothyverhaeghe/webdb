/*

  This is a controller which handles everything for Authentificaiton.

*/

const Users = require('@models/users');
const Sessions = require('@models/sessions');
const ObjectId = require('mongoose').Types.ObjectId;
const Projects = require('@models/projects');

const check = (req, res, next) => {
  if (req.query.token) {
    req.headers.authorization = req.query.token;
  }

  if (typeof req.headers.authorization === 'undefined' || (req.headers.authorization.replace('Bearer ', '').length <= 0)) {
    res.status(401);
    console.log('Unauthorized (missing authorization header) (A1)');
    res.end('Unauthorized (A1)');
  } else {
    const bearer = req.headers.authorization.replace('Bearer ', '');
    if (!bearer || !ObjectId.isValid(bearer)) {
      res.status(401);
      console.log('Unauthorized: incorrect bearer token (A5)');
      res.json('Unauthorized (A5)');
    } else {
      Sessions.findOne({
        _id: bearer,
        active: true,
      }).exec(async (err, session) => {
        if (err) {
          console.log(err);
          res.status(401);
          console.log('Unauthorized (A3)');
          res.json('Unauthorized (A3)');
        } else if (session && session.user) {
          delete session.user.password; // remove the password field

          const user = await Users.findOne({ _id: session.user }).lean().exec();
          if (!user || !user._id) {
            console.log('Error, session found, but no user.');
            return res.json('Unauthorized (A3)');
          }

          // console.log('USERID:', user._id);
          user.projects = await Projects.find({ 'users.user': user._id }).lean().exec();

          if (!user.projects) {
            user.projects = [];
          }

          if (user.project) {
            user.projects = await Projects.findOne({ _id: user.project }).lean().exec();
          } else if (user.project && user.projects[0]) {
            // TODO: a user without a profile, this will crash...
            user.project = await Projects.findOne({ _id: user.projects[0]._id }).lean().exec();
          }

          if (!user.project && user.projects.length > 0) {
            user.project = user.projects[0];
          } else {
            console.log('USER REQUEST WITHOUT Project');
          }

          req.user = user;
          next();
          Users.updateOne({ _id: session.user._id }, { $set: {
            lastActive: new Date(),
          } }).exec((err) => {
            if (err) console.log(err);
          });
        } else {
          console.log('Unauthorized API call made (A4)');
          res.status(401);
          res.json('Unauthorized (A4)');
        }
      });
    }
  }
};


module.exports = {
  check,
};
