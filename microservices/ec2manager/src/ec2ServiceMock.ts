import EC2Service from "./contracts/ec2Service";

export class EC2ServiceMock implements EC2Service {
    
    startInstances(instanceIds: String[]) {
        if(instanceIds.indexOf('i-0817c3239d7db3d89') < 0) {
            throw new Error();
        }
    }   
    stopInstances(instanceIds: String[]) {
        if(instanceIds.indexOf('i-0817c3239d7db3d89') < 0) {
            throw new Error();
        }
    }


}