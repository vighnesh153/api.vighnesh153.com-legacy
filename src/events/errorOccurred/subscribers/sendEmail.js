const sgMail = require('@sendgrid/mail');
const { subscribe } = require('../emitter');

const config = require('../../../config');
const { instance: logger } = require('../../../loaders/logger');

sgMail.setApiKey(config.SENDGRID_API_KEY);

// Send Email
subscribe(({ message, stackTrace }) => {
  const msg = {
    to: config.ADMIN_TO_EMAIL,
    from: config.ADMIN_FROM_EMAIL,
    templateId: config.SENDGRID_TEMPLATE_ID,
    dynamicTemplateData: {
      message,
      stackTrace,
    },
  };
  logger.info({ message: 'Sending Error occurred Email' });
  sgMail
    .send(msg)
    .then(([res]) => {
      logger.info({
        message: 'Email sent',
        body: res.body,
        status: res.status,
      });
    })
    .catch((err) => {
      logger.error({
        message: 'Email sending failed.',
        body: err.response.body,
      });
    });
});
