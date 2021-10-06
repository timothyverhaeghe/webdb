// Required Node packages
const express = require('express');
const Auth = require('@middleware/auth');
const Users = require('@models/users');
const Sessions = require('@models/sessions');
const env = require('@env');
const Emails = require('@plugins/sendgrid/mails');
const cdn = require('@middleware/cdn');
const Tokens = require('@middleware/ids');

// Required middleware/functions
const router = express.Router();


router.get('/me/tokens/:token', async (req, res) => {
  const session = await Sessions.findOne({ token: req.params.token, active: false });
  if (session && session._id) {
    await Sessions.updateOne({ _id: session._id }, { $set: { activated: new Date(), active: true } });
    return res.json({
      session: session._id,
    });
  }
  res.json({
    error: 'Incorrect or expired token.',
  });
});


router.post('/token', async (req, res) => {
  if (!req.body.email) {
    return res.json({ success: false, error: 'Email is a required field.' });
  }

  console.log('New token request:', req.body.email);
  const user = await Users.findOne({ email: req.body.email.toLowerCase() });
  if (!user || !user._id) {
    return res.json({ success: false, error: "We couldn't find a user with this email. Are you sure this email is correct?" });
  }

  // TODO: create session

  const token = Tokens.generate(7);

  const session = await new Sessions({
    user: user._id,
    token,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || '',
    ua: req.useragent.source,
    isMobile: req.useragent.isMobile,
    version: req.useragent.version,
    browser: req.useragent.browser,
    os: req.useragent.os,
    platform: req.useragent.platform,
    active: false,
    country: (req.headers['cf-ipcountry'] || ''),
  }).save();

  // TODO: send email
  const url = `${env.appURL}/token/${token}`;
  console.log(`[LOG] Send email: ${user.email} for session ${session._id}. Url: ${url}`);
  await Emails.sendMail(user.email, 'd-1bda86398e364064b6d99e14d635e2f0', {
    url,
    token,
  });

  res.json({ success: true, message: "Mail is on it's way. Please check your inbox." });
});


router.put('/me', Auth.check, async (req, res) => {
  await Users.update({ _id: req.user._id }, { $set: req.body }).exec();
  return res.json({
    ok: 1,
  });
});


router.put('/me/profile-picture', Auth.check, cdn.middleware('profile-pictures'), async (req, res) => {
  await Users.updateOne({ _id: req.user._id }, { $set: { avatar: env.cdnURL + req.files[0].cdn.webpath } }).exec();
  console.log(`Profile picture changed for (${req.user.email}) to:`, env.cdnURL + req.files[0].cdn.webpath);
  res.json({
    picture: env.cdnURL + req.files[0].cdn.webpath,
  });
});


router.get('/me', Auth.check, async (req, res) => {
  res.json(req.user);
});


module.exports = router;
