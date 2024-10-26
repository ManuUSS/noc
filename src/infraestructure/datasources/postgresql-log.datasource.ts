import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prisma = new PrismaClient();

const severityEnum = {
  low:    SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high:   SeverityLevel.HIGH,
}

export class PostgreSQLLogDataSource implements LogDatasource {


  async saveLog( log:LogEntity ): Promise<void> {

    await prisma.logModel.create({
      data: {
        ...log,
        level: severityEnum[log.level]
      }
    });

  }

  async getLogs( severityLevel:LogSeverityLevel ): Promise<LogEntity[]> {
    
    const logs = await prisma.logModel.findMany(
      {
        where: {
          level: severityEnum[severityLevel]
        }
      }
    );


    return logs.map( LogEntity.fromObject );

  }

}