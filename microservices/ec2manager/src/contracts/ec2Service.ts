export default interface EC2Service {

    startInstances(instanceIds: string[]);
    stopInstances(instanceIds: string[]);
}
