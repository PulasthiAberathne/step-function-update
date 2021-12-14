"use strict";
const AWS = require("aws-sdk");
const step_function = require("./testStep.json");
AWS.config.update({ region: "us-east-2" });

let stepFunctions = new AWS.StepFunctions();

const listStepFunctions = async (stepFunctionName) => {
  var paramsList = {
    maxResults: "900",
    // nextToken: "STRING_VALUE",
  };
  try {
    const listRes = await stepFunctions.listStateMachines(paramsList).promise();
    // console.log(listRes);
    if (listRes.stateMachines.length) {
      return listRes.stateMachines.find(
        (item) => item.name === stepFunctionName
      );
    }
  } catch (error) {}
  return null;
};

const createStepFunction = async () => {
  let params = {
    name: "testingStepFunction",
    roleArn: "arn:aws:iam::175437885081:role/Administrator",
    definition: JSON.stringify(step_function),
  };

  try {
    const createRes = await stepFunctions.createStateMachine(params).promise();
    return createRes;
  } catch (error) {
    if (error) {
      const listResARN = await listStepFunctions(params.name);
      if (listResARN && listResARN.stateMachineArn) {
        let paramsUpdate = {
          stateMachineArn: listResARN.stateMachineArn,
          definition: JSON.stringify(step_function),
          loggingConfiguration: {
            includeExecutionData: true,
          },
          roleArn: "arn:aws:iam::175437885081:role/Administrator",
        };

        const updateRes = await stepFunctions
          .updateStateMachine(paramsUpdate)
          .promise();

        return updateRes;
      }
    }
    return error;
  }
};

createStepFunction();