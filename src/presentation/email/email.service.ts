import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendEmailOptions {
  to:       string | string[];
  subject:  string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  constructor () {}

  async sendEmail( options:SendEmailOptions ):Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      
      const sentInfo = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      });

      console.log( sentInfo );

      return true;

    } catch ( error ) {

      return false;
    }
  }

  async sendEmailWithFileSystemLogs( to: string | string[] ) {
    const subject = 'Server logs - NOC';
    const htmlBody = `
    <h3>System Logs - NOC</h3>
    <p>Lorem velit non veniam ullamco ex eu laborum deserunt est amet elit nostrud sit. Dolore ullamco duis in ut deserunt. Ad pariatur labore exercitation adipisicing excepteur elit anim eu consectetur excepteur est dolor qui. Voluptate consectetur proident ex fugiat reprehenderit exercitation laboris amet Lorem ullamco sit. Id aute ad do laborum officia labore proident laborum. Amet sit aliqua esse anim fugiat ut eu excepteur veniam incididunt occaecat sit irure aliquip. Laborum esse cupidatat adipisicing non et cupidatat ut esse voluptate aute aliqua pariatur.</p>
    <p>See attachments</p>
    `;

    const attachments:Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });

  }

}