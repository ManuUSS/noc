import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


describe('log.datasource.ts', () => {

  const mockLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test message',
    level: LogSeverityLevel.low,
  })

  class MockLogDataSource implements LogDatasource {

    async saveLog( log:LogEntity ): Promise<void> {
      return;
    }

    async getLogs( severityLevel:LogSeverityLevel ): Promise<LogEntity[]> {
      return [ mockLog ];
    }

  } 


  test('should test the abstract class', async () => {

    const logDataSource = new MockLogDataSource();

    expect( logDataSource ).toBeInstanceOf( MockLogDataSource );
    expect( typeof logDataSource.saveLog ).toBe('saveLog');
    expect( typeof logDataSource.getLogs ).toBe('getLogs');

    await logDataSource.saveLog( mockLog );

    const logs = await logDataSource.getLogs( LogSeverityLevel.low );

    expect( logs ).toHaveLength( 1 );
    expect( logs[0] ).toBeInstanceOf( LogEntity );

  });

});