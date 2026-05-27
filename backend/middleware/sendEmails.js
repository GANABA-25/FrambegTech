const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ganaba1324@gmail.com",
    pass: "qvof mwkz etdg jpqs",
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Frambeg-Tech" <ganaba1324@gmail.com>',
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
