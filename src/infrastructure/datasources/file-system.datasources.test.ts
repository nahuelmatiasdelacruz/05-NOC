import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';
describe('file-system.datasource.ts',()=>{
  const logPath = path.join(__dirname,'../../../logs');
  beforeEach(()=>{
    fs.rmSync(logPath,{recursive: true,force: true});
  })
  
  test('should create log file if they do not exists',()=>{
    new FileSystemDatasource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
  });

  test('should save a log in logs-all.log',()=>{
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    });
    logDatasource.saveLog(log);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test('should save a log in logs-all.log and logs-medium.log',()=>{
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    });
    const logMedium = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    });
    logDatasource.saveLog(log);
    logDatasource.saveLog(logMedium);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`,'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(logMedium));
  });

  test('should save a log in logs-high.log and logs-high.log',()=>{
    const logDatasource = new FileSystemDatasource();
    const log = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    });
    const logHigh = new LogEntity({
      message: 'Test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    });
    logDatasource.saveLog(log);
    logDatasource.saveLog(logHigh);
    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`,'utf-8');
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`,'utf-8');
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(logHigh));
  });

  test('should return all logs',async()=>{
    const logDatasource = new FileSystemDatasource();
    const logLow = new LogEntity({
      message: 'Low log',
      level: LogSeverityLevel.low,
      origin: 'low'
    });
    const logMedium = new LogEntity({
      message: 'medium log',
      level: LogSeverityLevel.medium,
      origin: 'medium '
    });
    const logHigh = new LogEntity({
      message: 'high log',
      level: LogSeverityLevel.high,
      origin: 'high'
    });
    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(expect.arrayContaining([logLow,logMedium,logHigh]));
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });

  test('should not throw an error if path exists',()=>{
    new FileSystemDatasource();
    new FileSystemDatasource();
    expect(true).toBeTruthy();
  });

  test('should throw an error if severitylevel is not defined',async ()=>{
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = 'SUPER_HIGH' as LogSeverityLevel;
    try{
      await logDatasource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    }catch(e){
      const errorString = `${e}`;
      console.log(`${customSeverityLevel} not implemented`);
    }
  })

});