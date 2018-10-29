import AWS = require('aws-sdk');
import { parseEvent } from '../eventParser';
// modern module syntax
export async function endpoint(event, context, callback) {

  const ec2 = new AWS.EC2({apiVersion: '2016-11-15', region: 'us-west-2'});

  const params = parseEvent(event);
  console.log(JSON.stringify(params));
  ec2.stopInstances(params, (err, data) => {
    if (err && err.code === 'DryRunOperation') {
      params.DryRun = false;
      ec2.stopInstances(params, (e, d) => {
          if (e) {
            console.log('Error', e);
          } else if (d) {
            console.log('Success', d.StoppingInstances);
          }
      });
    } else {
      console.log(err);
      console.log('You don\'t have permission to stop instances');
    }
  });

  const response = {
    body: JSON.stringify({
      input: event,
      message: `Hello, Lambda!!`,
    }),
    statusCode: 200,
  };

  callback(null, response);
}
