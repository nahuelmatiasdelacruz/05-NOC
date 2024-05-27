import { CheckService, SendEmailLogs } from "../domain";
import { FileSystemDatasource } from "../infrastructure";
import { LogRepositoryImplementation } from "../infrastructure/repositories";
import { CronService } from "./cron";
import { EmailService } from "./email";

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const emailService = new EmailService();

export class Server {
  public static start(){
    console.log('Server started');
    new SendEmailLogs(emailService,fileSystemLogRepository).execute(['gamingp4nic@gmail.com']);
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://googasdsdasdale.com';
        new CheckService(fileSystemLogRepository).execute(url);
      }
    );
  };
};