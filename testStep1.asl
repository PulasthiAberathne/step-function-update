{
    "Comment": "A Catch example of the Amazon States Language using an AWS Lambda Function",
    "StartAt": "checkInventory",
    "States": {
        "checkInventory": {
            "Type": "Task",
            "Resource": "arn:aws:lambda:us-east-2:175437885081:function:checkInventory",
            "Catch": [
                {
                    "ErrorEquals": [
                        "CustomError"
                    ],
                    "Next": "ReservedTypeFallback"
                },
                {
                    "ErrorEquals": [
                        "States.TaskFailed"
                    ],
                    "Next": "ReservedTypeFallback"
                },
                {
                    "ErrorEquals": [
                        "States.ALL"
                    ],
                    "Next": "CatchAllFallback"
                }
            ],
            "End": true
        },
       
        "ReservedTypeFallback": {
            "Type": "Pass",
            "Result": "This is a fallback from a reserved error code",
            "End": true
        },
        "CatchAllFallback": {
            "Type": "Pass",
            "Result": "This is a fallback from a reserved error code",
            "End": true
        }
    }
}