const nodedmailer = require("nodemailer");

const sendEmail = async ({ from, to, subject, text, html }) => {
  const transporter = nodedmailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const response = await transporter.sendMail({
    from: `FunShare <${from}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
