import { endpoint } from './handler';
import createEvent = require('aws-event-mocks');

import { Handler } from 'aws-lambda';
import { generateMockCallback, invokeHandler } from 'lambda-utilities';

describe('aws/handler', () => {

    describe('endpoint', () => {

        test('Should return response.', (done) => {
            const event = createEvent({
                template: 'aws:scheduled',
                merge: {
                  instances: ['i-0817c3239d7db3d89'],
                  operation: 'STOP',
                  region: 'us-west-2',
                },
              });
              console.log(JSON.stringify(event));
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

});
