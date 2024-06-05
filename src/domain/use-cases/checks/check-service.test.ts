import { LogEntity } from "../../entities";
import { CheckService } from "./check-service";

describe('check-service.ts use case',()=>{
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );
  beforeEach(()=>{
    jest.clearAllMocks();
  })
  test('should call success callback when fetch returns true',async ()=>{
    const wasOk = await checkService.execute('https://google.com');
    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
  test('should call error callback when use case fails',async ()=>{
    const wasOk = await checkService.execute('https://goadsadsadsogle.com');
    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});