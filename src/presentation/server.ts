import { CheckService } from "../domain";
import { CronService } from "./cron";

export class Server {
  public static start(){
    console.log('Server started');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://google.com';
        new CheckService(
          ()=>console.log('Success'),
          (error)=>console.log(error)
        ).execute(url);
      }
    );
  };
};