const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'luan.koi.42@gmail.com',
      pass: 'luan02071998'
    }
});

module.exports={
    transporter: transporter
}