import EC2Service from '../contracts/ec2Service';

export class EC2Manager {

  public manageInstances(instanceIds: string[], operation: string , ec2Service: EC2Service) {
    try {
      switch (operation) {
        case 'Start':
          ec2Service.startInstances(instanceIds);
          break;
        case 'Stop':
          ec2Service.stopInstances(instanceIds);
          break;
        default:
          break;
      }
    } catch (e) {
      // TODO maybe do something here
      throw e;
    }

  }
}
