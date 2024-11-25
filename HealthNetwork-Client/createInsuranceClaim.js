const { clientApplication } = require("./client"); // Import the client application

let userClient = new clientApplication(); // Create an instance of clientApplication

// Define the transient data with base64 encoding
const transientData = {
  diagnosis: Buffer.from("fever").toString("base64"), // Encoded diagnosis
  medication: Buffer.from("Paracetamol").toString("base64"), // Encoded medication
  testResults: Buffer.from("Positive").toString("base64"), // Encoded test results
};

// Call submitTxn method for creating an insurance claim
userClient
  .submitTxn(
    "insurance", // The organization initiating the transaction
    "healthchannel", // The channel name
    "HealthNetwork", // The chaincode name
    "HealthcareContract", // The contract name within the chaincode
    "privateTxn", // Transaction type (private)
    transientData, // Transient data containing the claim details
    "createInsuranceClaim", // The transaction name/method
    "Claim-004", // The claim ID
    "P004" // Patient ID (replace with actual patient ID)
  )
  .then((result) => {
    // If the transaction is successful, print the result
    console.log(
      "Insurance claim successfully created: ",
      new TextDecoder().decode(result)
    );
  })
  .catch((error) => {
    // Handle any errors during the transaction
    console.error("Error creating insurance claim:", error);
  });
