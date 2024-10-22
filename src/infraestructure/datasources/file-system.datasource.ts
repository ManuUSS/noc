import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


export class FileSystemDataSource implements LogDatasource {
  
  private readonly logPath:string = 'logs/';
  private readonly allLogsPath:string    = 'logs/logs-all.log';
  private readonly mediumLogsPath:string = 'logs/logs-medium.log';
  private readonly highLogsPath:string   = 'logs/logs-high.log';

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles = () => {
    if( fs.existsSync(this.logPath) ) return;
    
    fs.mkdirSync(this.logPath);

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach( ( path ) => {
      if( fs.existsSync( path ) ) return;
      fs.writeFileSync(path, '');
    });

  };

  async saveLog( newLog:LogEntity ): Promise<void> {

    const logAsJson = `${ JSON.stringify( newLog ) }\n`;

    fs.appendFileSync(
      this.allLogsPath, 
      logAsJson
    );
    
    if( newLog.level === LogSeverityLevel.low ) return;

    const logPath = ( newLog.level === LogSeverityLevel.medium )
      ? this.mediumLogsPath
      : this.highLogsPath;

    fs.appendFileSync(
      logPath, 
      logAsJson
    );

  }
  
  getLogs( severityLevel:LogSeverityLevel ): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }

}

