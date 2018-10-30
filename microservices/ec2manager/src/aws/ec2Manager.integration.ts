import AWS = require('aws-sdk');

describe('aws/handler', () => {
    const lambda = new AWS.Lambda({region: 'us-east-1', apiVersion: '2015-03-31'});

    test('deployed lambda should return 200 ok', async () => {
        // create JSON object for parameters for invoking Lambda function
        const pullParams = {
            FunctionName : 'serverless-multiservice-ec2manager-cicd-stopEC2Instances',
            // TODO: remove hardcoded params
            InvocationType : 'RequestResponse',
            LogType : 'None',
        };

        const d = await lambda.invoke(pullParams).promise();
        expect(d).toHaveProperty('StatusCode', 200);
    });

});
