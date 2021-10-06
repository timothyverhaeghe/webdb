/* THIS IS FOR OUR NPM PACKAGE */
const multer = require('multer');
const path = require('path');
const request = require('request');
const fs = require('fs');

const env = require('../env');

const settings = {
  cdn: env.cdnURL || '',
  token: env.cdnToken || '',
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/tmp/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

// FEATURE REQUEST: make it possible to remove the original file

const raw = multer({ storage });

const init = (options) => {
  for (let i = 0; i < Object.keys(options).length; i += 1) {
    const key = Object.keys(options)[i];
    settings[key] = options[key];
  }
  return true;
};

const upload = (options, next) => {
  // Define a path where to store this file.
  // You can easily use this for eg. customer avatars etc.

  // console.log(`[LOG] Post call to ${(options.cdn || settings.cdn)}/v1/files`);

  request.post({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: `bearer ${(options.token || settings.token)}`,
    },
    uri: `${(options.cdn || settings.cdn)}/v1/files`,
    method: 'POST',
    formData: {
      path: options.path || options.file,
      regularFile: fs.createReadStream(options.file),
    },
  }, (err, resp, body) => {
    // TODO: if statuscode != 200
    if (err) {
      console.log('Error!');
      console.log(err);
      next(err, false);
    } else {
      // console.log(body);
      next(false, JSON.parse(body).data);
    }
  });
};

const promiseUpload = async options => new Promise((resolve) => {
  upload(options, (err, data) => {
    resolve(data);
  });
});

const middleware = path => (req, res, next) => {
  raw.any()(req, {}, async (err) => {
    if (err) throw err;
    if (req.files && req.files.length > 0) {
      for (const index in req.files) {
        console.log(req.files[index].path);
        req.files[index].cdn = await promiseUpload({
          file: req.files[index].path,
          path: `/${(path || req.body.project || 'unknown')}/${req.files[index].filename}`,
        });
      }
      next();
    } else {
      console.log('NO file to upload to cdn.');
      next();
    }
  });
};

module.exports = {
  init,
  upload,
  raw,
  middleware,
};
