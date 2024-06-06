import { LogEntity, LogSeverityLevel } from "../../domain/entities";
import { LogRepositoryImplementation } from "./log-impl.repository";

describe('LogRepositoryImpl',()=>{
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const logRepository = new LogRepositoryImplementation(mockLogDatasource);
  beforeEach(()=>{
    jest.clearAllMocks();
  })
  test('save log should call the datasource with arguments',async ()=>{
    const log = {level: LogSeverityLevel.high, message: 'hola'} as LogEntity;
    await logRepository.saveLog(log);
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });
  test('get logs should call the datasource with arguments',async ()=>{
    await logRepository.getLogs(LogSeverityLevel.low);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});