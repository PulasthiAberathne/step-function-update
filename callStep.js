"use strict";
const AWS = require("aws-sdk");
const step_function = require("./testStep2.json");
AWS.config.update({ region: "us-east-2" });

let stepFunctions = new AWS.StepFunctions();

let stepName = "testStep2";
let id = "175437885081";

module.exports.createStepFunction = async () => {
  let params = {
    name: stepName,
    roleArn: "arn:aws:iam::" + id + ":role/Administrator",
    definition: JSON.stringify(step_function),
  };

  try {
    const createRes = await stepFunctions.createStateMachine(params).promise();
    let output =
      "Step Function has been created. State Machine ARN: " +
      createRes.stateMachineArn;
    // console.log(output);
    return output;
  } catch (error) {
    if (
      error.code === "StateMachineAlreadyExists" &&
      error.statusCode === 400
    ) {
      let paramsUpdate = {
        stateMachineArn:
          "arn:aws:states:us-east-2:" + id + ":stateMachine:" + stepName,
        definition: JSON.stringify(step_function),
        loggingConfiguration: {
          includeExecutionData: true,
        },
        roleArn: "arn:aws:iam::" + id + ":role/Administrator",
      };

      const updateRes = await stepFunctions
        .updateStateMachine(paramsUpdate)
        .promise();
      let output =
        "Step Function has been updated. Updated Time Stamp: " +
        updateRes.updateDate;
      console.log(output);
      return output;
    }
    return error;
  }
};

// createStepFunction();

// module.exports.createStepFunction;