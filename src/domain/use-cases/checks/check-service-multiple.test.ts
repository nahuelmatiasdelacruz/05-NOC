import { LogEntity } from "../../entities";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('check-service-multiple.ts',()=>{
  const mockMongoRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };
  const mockPostgresRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };
  const mockFileSystemRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();
  const checkService = new CheckServiceMultiple(
    [mockMongoRepository,mockPostgresRepository,mockFileSystemRepository],
    successCallback,
    errorCallback
  )
  beforeEach(()=>{
    jest.clearAllMocks();
  })
  test('should call all success callback when mock fetch true',async ()=>{
    const wasSuccess = await checkService.execute('http://www.google.com');
    expect(wasSuccess).toBe(true);
    expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
  });
  test('should call all error callbacks when mocks fetch fail',async ()=>{
    const wasSuccess = await checkService.execute('http://goasgsaggs.com');
    expect(wasSuccess).toBe(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockFileSystemRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    console.log(wasSuccess);
  });
})