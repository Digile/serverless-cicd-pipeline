import EC2Service from '../ec2Service';
import { parseEvent } from '../eventParser';
// modern module syntax
export async function endpoint(event, context, callback) {
  const ec2 = new EC2Service();

  const instanceIds = parseEvent(event);

  const operation: string = event.operation;

  const response = {
    body: JSON.stringify({
      input: event,
      message: `Hello, Lambda!!`,
    }),
    statusCode: 200,
  };

  try {
    switch (operation) {
      case 'Start':
        ec2.startInstances(instanceIds);
        break;
      case 'Stop':
        ec2.stopInstances(instanceIds);
        break;
      default:
        break;
    }

  } catch (e) {
    callback(e, null);
  }

  callback(null, response);

}
