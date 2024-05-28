import { CheckService, SendEmailLogs } from "../domain";
import { FileSystemDatasource,LogRepositoryImplementation, MongoLogDatasource } from "../infrastructure";
import { CronService } from "./cron";
import { EmailService } from "./email";

const logRepository = new LogRepositoryImplementation(new MongoLogDatasource());
const emailService = new EmailService();

export class Server {
  public static start(){
    console.log('Server started');
    new SendEmailLogs(emailService,logRepository).execute(['gamingp4nic@gmail.com']);
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://gfadsfadsfads.com';
        new CheckService(logRepository).execute(url);
      }
    );
  };
};