
export enum LogSeverityLevel {
  low    = 'low',
  medium = 'medium',
  high   = 'high',
};

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor( options:LogEntityOptions ) {

    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;

  }

  /**
   * Convert a JSON string to a LogEntity object
   * @param { string } json 
   * @returns { LogEntity }
   */
  static fromJson( json:string ): LogEntity {

    const { message, level, createdAt, origin } = JSON.parse( json );
    
    const log = new LogEntity({
      message, 
      level,
      createdAt,
      origin
    });

    log.createdAt = new Date( createdAt );
    return log;
  }

  static fromObject( obj: { [ key:string ] : any }):LogEntity {
    const { message, level, createdAt, origin } = obj;

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin
    });

    return log;
  }

}

