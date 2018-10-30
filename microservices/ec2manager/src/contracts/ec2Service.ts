export default interface EC2Service {

    startInstances(instanceIds : String[]);
    stopInstances(instanceIds : String[]);
}