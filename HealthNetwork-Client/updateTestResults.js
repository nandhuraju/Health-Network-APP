const { clientApplication } = require("./client");

let userClient = new clientApplication();
userClient
  .submitTxn(
    "laboratory",
    "healthchannel",
    "HealthNetwork",
    "HealthcareContract",
    "invokeTxn",
    "",
    "updateTestResults",
    "P004", // Patient ID
    "Positive" // Test Results
  )
  .then((result) => {
    console.log(new TextDecoder().decode(result));
    console.log("Test results successfully updated");
  })
  .catch((error) => {
    console.error("Error updating test results:", error);
  });
