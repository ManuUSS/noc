import mongoose from 'mongoose';

import { envs } from '../../config/plugins/envs.plugin';
import { MongoDatabase } from '../../data/mongo';
import { MongoLogDataSource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo/models/log.model';


describe('mongo-log.datasource', () => {
  
  const logDataSource = new MongoLogDataSource();

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should save a log', async () => {

    const logSpy = jest.spyOn( console, 'log' );

    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.low,
      origin: 'test',
    });

    await logDataSource.saveLog( log );
    expect( logSpy ).toHaveBeenCalled();
    expect( logSpy ).toHaveBeenCalledWith('Mongo log saved:', expect.any( String ));

  });

  test('should get logs by severity level', async () => {
    
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.low,
      origin: 'test',
    });

    await logDataSource.saveLog( log );
    await logDataSource.saveLog( log );

    const logs = await logDataSource.getLogs( LogSeverityLevel.low );

    expect( logs.length ).toBe( 2 );
    expect( logs[0].level ).toBe( LogSeverityLevel.low );

  });

});

