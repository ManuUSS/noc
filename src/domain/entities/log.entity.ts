
export enum LogSeverityLevel {
  low    = 'low',
  medium = 'medium',
  high   = 'high',
};

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor( message:string, level:LogSeverityLevel ) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  /**
   * Convert a JSON string to a LogEntity object
   * @param { string } json 
   * @returns { LogEntity }
   */
  static fromJson( json:string ): LogEntity {
    const parsed = JSON.parse( json );
    const log = new LogEntity( parsed.message, parsed.level );
    log.createdAt = new Date( parsed.createdAt );
    return log;
  }

}

