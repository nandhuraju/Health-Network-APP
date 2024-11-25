"use strict";

const { clientApplication } = require("./client");

let userClient = new clientApplication();
userClient
  .submitTxn(
    "hospital",
    "healthchannel",
    "HealthNetwork",
    "HealthcareContract",
    "queryTxn",
    "",
    "getMedicalRecord",
    "P004" // Patient ID
  )
  .then((result) => {
    console.log(new TextDecoder().decode(result));
  })
  .catch((error) => {
    console.error("Error fetching medical record:", error);
  });
