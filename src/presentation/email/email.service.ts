
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

export interface SendMailOptions {
  to: string | string [];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[]
}

export interface Attachment{
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });
  constructor(){};
  async sendEmail(options: SendMailOptions): Promise<boolean>{
    const {to,subject,htmlBody,attachments = []} = options;
    try{
      await this.transporter.sendMail({to,subject,html: htmlBody,attachments});
      return true;
    }catch(e){
      console.log({e});
      return false;
    };
  };
  async sendEmailWithFileSystemLogs(to: string | string []){
    const subject = 'Logs del servidor';
    const htmlBody = `
      <h3>Logs de sistema NOC</h3>
      <p>lorem asdfb79a86 5dfb76a5fv as8dyfha7df0 82834 q83yng negs8dfgb 86hh324</p>
      <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      {filename: 'logs-all.log',path: './logs/logs-all.log'},
      {filename: 'logs-high.log',path: './logs/logs-high.log'},
      {filename: 'logs-medium.log',path: './logs/logs-medium.log'}
    ];
    return this.sendEmail({to,subject,attachments,htmlBody});
  }
};