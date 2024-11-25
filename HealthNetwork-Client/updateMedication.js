"use strict";

const { clientApplication } = require("./client");

let userClient = new clientApplication();
userClient
  .submitTxn(
    "pharmacy",
    "healthchannel",
    "HealthNetwork",
    "HealthcareContract",
    "invokeTxn",
    "",
    "updateMedication",
    "P004", // Patient ID
    "Paracetamol" // Medication
  )
  .then((result) => {
    console.log(new TextDecoder().decode(result));
    console.log("Medication updated successfully");
  })
  .catch((error) => {
    console.error("Error updating medication:", error);
  });
