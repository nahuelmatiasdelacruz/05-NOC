import { LogEntity, LogSeverityLevel } from "../../entities";
import { LogRepository } from "../../repository";

interface CheckServiceUseCase {
  execute(url: string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase{
  
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ){}

  public async execute(url: string): Promise<boolean>{
    try{
      const request = await fetch(url);
      if(!request.ok){
        throw new Error(`Error on check service: ${url}`);
      }
      const log = new LogEntity(`Service ${url} working`,LogSeverityLevel.low);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    }catch(e){
      const errorMessage = `${e}`
      const log = new LogEntity(`Service ${url} IS NOT working. ${e}`,LogSeverityLevel.high);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${e}`);
      return false;
    };
  };
};