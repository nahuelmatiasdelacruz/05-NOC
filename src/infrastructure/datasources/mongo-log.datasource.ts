import { LogModel } from '../../data';
import { LogDatasource } from '../../domain/datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';

export class MongoLogDatasource implements LogDatasource{
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log(newLog);
    console.log(`Log has been saved`);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({level: severityLevel});
    return logs.map(log=>LogEntity.fromObject(log));
  }
}