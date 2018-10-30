import EC2ServiceI from "../ec2Service";
import { parseEvent } from "../eventParser";
import { EC2Manager } from "./ec2Manager";

export async function endpoint(event, context, callback) {
  const manager = new EC2Manager();
  const ec2 = new EC2ServiceI();

  const instanceIds = parseEvent(event);

  const operation: string = event.operation;

  try {
    manager.manageInstances(instanceIds, operation, ec2);

    const response = {
      body: JSON.stringify({
        //input: event,
        message: `Hello, Lambda!!`
      }),
      statusCode: 200
    };

    callback(null, response);
  } catch (e) {
    callback(e, null);
  }
}
