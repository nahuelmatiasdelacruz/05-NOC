import { EmailService } from "../../../presentation";
import { LogEntity } from "../../entities";
import { LogRepository } from "../../repository";
import { SendEmailLogs } from "./send-email-logs";

describe('send-email-logs.test.ts',()=>{
  const mockEmailService = {
    sendEmail: jest.fn(),
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }
  const mockLogRepository: LogRepository = {
    getLogs: jest.fn(),
    saveLog: jest.fn(),
  }
  afterAll(()=>{
    jest.clearAllMocks();
  })
  test('should call sendEmail and saveLog',async ()=>{
    const sendEmailLogs = new SendEmailLogs(mockEmailService as any,mockLogRepository);
    const result = await sendEmailLogs.execute('nahuel@google.com');
    expect(result).toBeTruthy();
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  test('should log in case of error',async ()=>{
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
    const sendEmailLogs = new SendEmailLogs(mockEmailService as any,mockLogRepository);
    const result = await sendEmailLogs.execute('nahuel@google.com');
    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(2);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});