const env = require('@env');
const axios = require('axios');

// const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Sends an email from, to with CS in CC
 */
const sendMail = (to, templateId, templateData) =>
  new Promise((resolve, reject) => {
    // console.log('New mail sent', to, templateId);
    if (!env.sendgridKey) {
      console.log('Sendgrid key is missing');
      return reject('Missing sendgridKey');
    }

    console.log('templateData:', templateData);

    axios
      .post(
        'https://api.sendgrid.com/v3/mail/send',
      {
        from: {
          email: env.fromEmails,
        },
        personalizations: [
          {
            to: [
              {
                email: to,
              },
            ],
            dynamic_template_data: templateData,
          },
        ],
        template_id: templateId,
      },
      {
        headers: {
          Authorization: `Bearer ${env.sendgridKey}`,
        },
      },
      )
      .then((response) => {
        console.log(response.status, response.statusText);
        console.log(
          'Ok mail sent with status ',
          response.status,
          to,
          templateId,
        );
        resolve();
      })
      .catch((error) => {
        console.log('ERROR 1', error);
        console.log(error.response.status, error.response.statusText);
        console.log('_____');
        resolve();
        // reject(error);
      });
  });

module.exports = {
  sendMail,
};
