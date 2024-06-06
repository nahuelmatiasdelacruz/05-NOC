import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from 'nodemailer';

describe('email.service.ts',()=>{
  const mockSendMail = jest.fn();
  const emailService = new EmailService();
  // Mock del createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });
  test('should send email', async ()=>{
    const options: SendMailOptions = {
      to: 'nahuel@correo.com',
      subject: 'test',
      htmlBody: '<h1>test</h1>'
    }
    await emailService.sendEmail(options);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>test</h1>",
      subject: "Test",
      to: 'nahuel@correo.com'
    });
  });

  test('should send emails with attachments',async()=>{
    await emailService.sendEmailWithFileSystemLogs('nahuel@correo.com');
    expect(mockSendMail).toHaveBeenCalledWith({
      to: 'nahuel@correo.com',
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {filename: 'logs-all.log',path: './logs/logs-all.log'},
        {filename: 'logs-high.log',path: './logs/logs-high.log'},
        {filename: 'logs-medium.log',path: './logs/logs-medium.log'}
      ])
    })
  })

});