import { CheckService } from "../domain";
import { FileSystemDatasource } from "../infrastructure";
import { LogRepositoryImplementation } from "../infrastructure/repositories";
import { CronService } from "./cron";

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());

export class Server {
  public static start(){
    console.log('Server started');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://asdfa6sdf.com';
        new CheckService(fileSystemLogRepository).execute(url);
      }
    );
  };
};