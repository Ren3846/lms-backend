const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        user: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transport.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>Для активации аккаунта перейлите по ссілке</h1>
          <a href="${link}">${link}</a>
        </div>
        `,
    });
  }
}

module.exports = new MailService();
