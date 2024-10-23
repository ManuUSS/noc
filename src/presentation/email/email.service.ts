import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to:       string;
  subject:  string;
  htmlBody: string;
  // attachments?: Attachment[];
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_SECRET_KEY,
    }
  });

  async sendEmail( options:SendEmailOptions ):Promise<boolean> {

    const { to, subject, htmlBody } = options;

    try {
      
      const sentInfo = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      return true;

    } catch ( error ) {
      
      return false;
    }
  }

}