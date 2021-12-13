"use strict";
const AWS = require("aws-sdk");

let stepFunctions = new AWS.StepFunctions();

var params = {
  name: "testingStepFunction",
  roleArn: "arn:aws:iam::175437885081:user/pulasthi-int",
};

var paramsUpdate = {
  stateMachineArn: null,
  definition: "",
  loggingConfiguration: {
    destinations: [
      {
        cloudWatchLogsLogGroup: {
          logGroupArn: "",
        },
      },
    ],
    includeExecutionData: true,
  },
  roleArn: "arn:aws:iam::175437885081:user/pulasthi-int",
  tracingConfiguration: {
    enabled: true,
  },
};

var paramsList = {
  maxResults: "900",
  // nextToken: "STRING_VALUE",
};

stepFunctions.listStateMachines(paramsList, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else {
    console.log(data);
    if (data.name === params.name) {
      paramsUpdate.stateMachineArn = data.stateMachineArn;
    }
  } // successful response
});

stepFunctions.createStateMachine(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
    if (err.message === "step function already exist") {
      stepFunctions.updateStateMachine(
        paramsUpdate,
        function (err, dataUpdate) {
          if (err) {
            console.log(err, err.stack); // get the error if update failed
          } else {
            console.log("Update Successful", dataUpdate);
          }
        }
      );
    }
  } else console.log(data); // successful response
});
