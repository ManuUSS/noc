import mongoose from 'mongoose';

import { MongoDatabase } from '../init';
import { envs } from '../../../config/plugins/envs.plugin';
import { LogModel } from './log.model';
import exp from 'constants';


describe('log.model.ts', () => {

  beforeAll( async () => {

    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName:   envs.MONGO_DB_NAME,
    });

  });

  afterAll(() => {
    mongoose.connection.close();
  });

  test('should return LogModel', async () => {
    
    const logData  = {
      origin: 'log.model.test.ts',
      message: 'should return LogModel test',
      level: 'low'
    };

    const logModel = await LogModel.create( logData );

    expect( logModel ).toEqual(
      expect.objectContaining({
        ...logData,
        _id: expect.any( mongoose.Types.ObjectId ),
        createdAt: expect.any( Date ),
      })
    );

    await LogModel.findByIdAndDelete( logModel._id );

  });

  test('should return the schema object', () => {

    const schema = LogModel.schema.obj;

    expect( schema ).toEqual( expect.objectContaining(
      {
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        createdAt: expect.any(Object)
      }
    ))

  });


});