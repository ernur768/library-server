const nodeMailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: to,
                subject: 'Активация аккаунта на ' + process.env.CLIENT_URL,
                text: '',
                html:
                    `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}" >${link}</a>
                    </div>
                `
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = new MailService()