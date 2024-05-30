import { CheckServiceMultiple } from '../domain';
import { FileSystemDatasource,LogRepositoryImplementation, MongoLogDatasource, PostgresLogDatasource } from '../infrastructure';
import { CronService } from './cron';

const postgresLogRepository = new LogRepositoryImplementation(new PostgresLogDatasource());
const fsLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImplementation(new MongoLogDatasource());
export class Server {
  public static start(){
    console.log('Server started');
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://gfadsfadsfads.com';
        new CheckServiceMultiple([postgresLogRepository,fsLogRepository,mongoLogRepository]).execute(url);
      }
    );
  };
};