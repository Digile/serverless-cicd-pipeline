import { EC2Manager } from "./ec2Manager";
import { generateMockCallback } from "lambda-utilities";
import { EC2ServiceMock } from "../ec2ServiceMock";

describe("aws/handler", () => {
  const stopInstancesFn = jest.spyOn(EC2ServiceMock.prototype, "stopInstances");
  const startInstancesFn = jest.spyOn(
    EC2ServiceMock.prototype,
    "startInstances"
  );

  afterEach(() => {
    stopInstancesFn.mockClear();
    startInstancesFn.mockClear();
  });

  describe("ec2Manager", () => {
    test.each([[{ instanceIds: ["i-0817c3239d7db3d89"], operation: "Stop" }]])(
      "it should execute stop instance  with valid params",
      params => {
        const m = new EC2Manager();
        const ec2 = new EC2ServiceMock(); // Try to use a mocked Ec2 Service
        m.manageInstances(params.instanceIds, params.operation, ec2);
        expect(stopInstancesFn).toBeCalledWith(params.instanceIds);
      }
    );

    test.each([[{ instanceIds: ["i-0817c3239d7db3d89"], operation: "popo" }]])(
      "it should not execute invalid operation",
      params => {
        const m = new EC2Manager();
        const ec2 = new EC2ServiceMock(); // Try to use a mocked Ec2 Service
        m.manageInstances(params.instanceIds, params.operation, ec2);
        expect(stopInstancesFn).not.toBeCalledWith();
      }
    );

    test.each([
      [  "Stop" , ["i-0817c3239d7db3d81"] ],
      [ "Stop" , ["i-0817c3239d7db3d19"] ],
      [ "Stop", ["i-"], ],
      [  "Stop", ["jgdfgid"] ]
    ])(`it should throw error when trying to %s %p invalid instances `, ( operation, instanceIds) => {
      const m = new EC2Manager();
      const ec2 = new EC2ServiceMock(); // Try to use a mocked Ec2 Service
      expect(() => {m.manageInstances(instanceIds, operation, ec2)}).toThrowError();
    });
  });
});
