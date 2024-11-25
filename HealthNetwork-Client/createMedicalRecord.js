"use strict";

const { clientApplication } = require("./client");

let userClient = new clientApplication();
userClient
  .submitTxn(
    "hospital", // Role
    "healthchannel", // Channel name
    "HealthNetwork", // Chaincode name
    "HealthcareContract", // Contract name
    "invokeTxn", // Transaction type
    "", // Additional options
    "createMedicalRecord", // Function name
    "P004", // Patient ID
    "Vishnu", // Name
    "fever" // Diagnosis
  )
  .then((result) => {
    console.log(new TextDecoder().decode(result));
    console.log("Medical record successfully created");
  })
  .catch((error) => {
    console.error("Error creating medical record:", error);
  });
