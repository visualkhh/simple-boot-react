export enum LoggerLevel {
  LOG = 'LOG',
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE',
  OFF = 'OFF'
}
export interface Logger {
  log(...args: any[]): void;
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  trace(...args: any[]): void;
}
export class LoggerBase implements Logger {
  constructor(protected config: { level: LoggerLevel }) {}
  public log(...args: any[]) {
    if (this.config.level === LoggerLevel.OFF) {
      return;
    }
    console.log(...args);
  }
  public error(...args: any[]) {
    if (this.config.level === LoggerLevel.OFF) {
      return;
    }
    (console.error ?? console.log)(...args);
  }
  public warn(...args: any[]) {
    if (
      this.config.level === LoggerLevel.ERROR ||
      this.config.level === LoggerLevel.LOG ||
      this.config.level === LoggerLevel.OFF
    ) {
      return;
    }
    (console.warn ?? console.log)(...args);
  }
  public info(...args: any[]) {
    if (
      this.config.level === LoggerLevel.WARN ||
      this.config.level === LoggerLevel.ERROR ||
      this.config.level === LoggerLevel.LOG ||
      this.config.level === LoggerLevel.OFF
    ) {
      return;
    }
    (console.info ?? console.log)(...args);
  }
  public debug(...args: any[]) {
    if (
      this.config.level === LoggerLevel.INFO ||
      this.config.level === LoggerLevel.WARN ||
      this.config.level === LoggerLevel.ERROR ||
      this.config.level === LoggerLevel.LOG ||
      this.config.level === LoggerLevel.OFF
    ) {
      return;
    }
    (console.debug ?? console.log)(...args);
  }
  public trace(...args: any[]) {
    if (this.config.level === LoggerLevel.TRACE) {
      (console.trace ?? console.log)(...args);
    }
  }
}
