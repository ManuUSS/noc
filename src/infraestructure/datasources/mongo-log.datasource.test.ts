import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugin';
import { MongoDatabase } from '../../data/mongo';
import { MongoLogDataSource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


describe('mongo-log.datasource', () => {

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });



  test('should save a log', async () => {

    const logDataSource = new MongoLogDataSource();
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


});

