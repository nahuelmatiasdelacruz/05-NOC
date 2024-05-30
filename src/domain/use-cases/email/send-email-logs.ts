import { EmailService } from '../../../presentation/email';
import { LogEntity, LogSeverityLevel } from '../../entities';
import { LogRepository } from '../../repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
};

export class SendEmailLogs implements SendLogEmailUseCase{

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ){}

  async execute (to: string | string[]){
    try{
      const log = new LogEntity({
        message: `Email sent`,
        level: LogSeverityLevel.low,
        origin: 'send-email-logs.ts'
      })
      this.logRepository.saveLog(log);
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if(!sent) throw new Error(`Email log was not sent`);
      return true;
    }catch(e){
      const log = new LogEntity({
        message: `${e}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-logs.ts'
      })
      this.logRepository.saveLog(log);
      return false;
    }
  }
}