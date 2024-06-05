import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.ts',()=>{
  const logObj = {
    message: 'Hola mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts'
  }
  test('should create a log entity instance',()=>{
    const log = new LogEntity(logObj);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logObj.message);
    expect(log.origin).toBe(logObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.level).toBe(logObj.level);
  });
  test('should create a LogEntity instance from json',()=>{
    const json = `{"level":"high","message":"Service http://gfadsfadsfads.com IS NOT working. TypeError: fetch failed","createdAt":"2024-06-04T16:26:20.200Z","origin":"check-service.ts"}`;
    const log = LogEntity.fromJson(json);
    expect(log.message).toBe("Service http://gfadsfadsfads.com IS NOT working. TypeError: fetch failed");
    expect(log.origin).toBe("check-service.ts");
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a log entity instance from object',()=>{
    const log = LogEntity.fromObject(logObj);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(logObj.message);
    expect(log.origin).toBe(logObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.level).toBe(logObj.level);
  })
})