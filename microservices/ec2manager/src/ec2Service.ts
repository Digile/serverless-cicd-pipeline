import AWS = require('aws-sdk');

export default class EC2Service {

    private ec2: AWS.EC2;

    constructor() {
        this.ec2  = new AWS.EC2({apiVersion: '2016-11-15', region: 'us-west-2'});
    }

    public startInstances( instanceIDs: string[]) {

        const params = {
            DryRun: true,
            InstanceIds : instanceIDs,
        };

        this.ec2.startInstances(params, (err, data) => {
            if (err && err.code === 'DryRunOperation') {
              params.DryRun = false;
              this.ec2.startInstances(params, (e, d) => {
                  if (e) {
                    return e;
                  } else if (d) {
                    return d;
                  }
              });

            } else {
                throw err;
            }
        });
    }

    public async stopInstances(instanceIDs: string[]) {
        const params = {
            DryRun: true,
            InstanceIds : instanceIDs,
        };

        this.ec2.stopInstances(params, (err, data) => {
            if (err && err.code === 'DryRunOperation') {
              params.DryRun = false;
              this.ec2.stopInstances(params, (e, d) => {
                  if (e) {
                    return e;
                  } else if (d) {
                    return d;
                  }
              });

            } else {
                return err;
            }
        });
    }

}
