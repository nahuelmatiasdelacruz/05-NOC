export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}
export interface LogEntityOptions{
  message: string;
  level: LogSeverityLevel;
  origin: string;
  createdAt?: Date;
}
export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions){
    const {message,level,origin,createdAt = new Date()} = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  };
  static fromJson = (json: string): LogEntity => {
    const {message,level,createdAt,origin} = JSON.parse(json);
    const log = new LogEntity({message,level,createdAt,origin});
    return log;
  }
};