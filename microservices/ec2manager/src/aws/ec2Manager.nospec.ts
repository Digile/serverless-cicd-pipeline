import createEvent = require('aws-event-mocks');

import { Handler } from 'aws-lambda';
import { generateMockCallback, invokeHandler } from 'lambda-utilities';
import EC2Service from '../ec2Service';

describe('aws/handler', () => {
  const stopInstancesFn = jest.spyOn(EC2Service.prototype, 'stopInstances');
  const startInstancesFn = jest.spyOn(EC2Service.prototype, 'startInstances');

  afterEach(() => {
    stopInstancesFn.mockClear();
    startInstancesFn.mockClear();
  });

  describe('endpoint', () => {

    test('Should return response.', (done) => {
      const event = createEvent({
        merge: {
          instanceIds: ['i-0817c3239d7db3d89'],
          operation: 'Stop',
        },
        template: 'aws:scheduled',
      });

      const callback = generateMockCallback((error, result: any) => {
        callback.once();
        const body = JSON.parse(result.body);
        expect(body.message).toBe('Hello, Lambda!!');
        expect(callback.verify()).toBe(true);

        done();
      });

      invokeHandler(endpoint as Handler, { event, callback });
    });
  });

  test('test stop instance', (done) => {
    //THis is not a true unit test 
    const event = createEvent({
      merge: {
        instanceIds: ['i-0817c3239d7db3d89'],
        operation: 'Stop',
      },
      template: 'aws:scheduled',
    });

    const callback = generateMockCallback((error, result: any) => {
      callback.once();
      expect(stopInstancesFn).toHaveBeenCalled();
      done();
    });

    invokeHandler(endpoint as Handler, { event, callback });
  });

  // TODO: need to fix this test .
  // test.only('test stop non existing instance', (done) => {
  //   const event = createEvent({
  //       merge: {
  //         instanceIds: ['i-0817c3239d7db3d81'],
  //         operation: 'Stop',
  //       },
  //       template: 'aws:scheduled',
  //     });

  //   const stopInstancesFn = jest.spyOn(EC2Service.prototype,'stopInstances');

  //   const callback = generateMockCallback((error, result: any) => {
  //     callback.once();
  //     expect(stopInstancesFn).toThrowError();
  //     done();
  //   });

  //   invokeHandler(endpoint as Handler, { event, callback });

  // });

  test('test invalid operation ', (done) => {
    const event = createEvent({
      merge: {
        instanceIds: ['i-0817c3239d7db3d89'],
        operation: 'invalid op',
      },
      template: 'aws:scheduled',
    });

    const callback = generateMockCallback((error, result: any) => {
      callback.once();
      expect(stopInstancesFn).not.toHaveBeenCalled();
      expect(startInstancesFn).not.toHaveBeenCalled();
      done();
    });

    invokeHandler(endpoint as Handler, { event, callback });
  });
});
