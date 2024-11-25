const express = require("express");
const router = express.Router();
const { clientApplication } = require("./client");

// Route to read a medical record
router.post("/readMedicalRecord", async (req, res) => {
  try {
    const { patientId } = req.body;
    let healthClient = new clientApplication();
    let record = await healthClient.submitTxn(
      "hospital",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "queryTxn",
      "",
      "getMedicalRecord",
      patientId
    );

    const data = new TextDecoder().decode(record);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "Medical record read successfully!",
      data: { value },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please check the Patient ID!",
      data: { error },
    });
  }
});

// Route to create a medical record
router.post("/createMedicalRecord", async (req, res) => {
  try {
    const { patientId, name, diagnosis } = req.body;

    let healthClient = new clientApplication();
    const result = await healthClient.submitTxn(
      "hospital",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "invokeTxn",
      "",
      "createMedicalRecord",
      patientId,
      name,
      diagnosis
    );

    res.status(201).json({
      success: true,
      message: "Medical record created successfully!",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating medical record!",
      data: { error },
    });
  }
});

// Route for Pharmacy to update medication
router.post("/updateMedication", async (req, res) => {
  try {
    const { patientId, medication } = req.body;
    let pharmacyClient = new clientApplication();
    const result = await pharmacyClient.submitTxn(
      "pharmacy",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "invokeTxn",
      "",
      "updateMedication",
      patientId,
      medication
    );

    res.status(200).json({
      success: true,
      message: "Medication updated successfully!",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating medication!",
      data: { error },
    });
  }
});

// Route for Laboratory to update test results
router.post("/updateTestResults", async (req, res) => {
  try {
    const { patientId, testResults } = req.body;
    let laboratoryClient = new clientApplication();
    const result = await laboratoryClient.submitTxn(
      "laboratory",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "invokeTxn",
      "",
      "updateTestResults",
      patientId,
      testResults
    );

    res.status(200).json({
      success: true,
      message: "Test results updated successfully!",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating test results!",
      data: { error },
    });
  }
});

// Route to query all medical records
router.get("/queryAllRecords", async (req, res) => {
  try {
    let healthClient = new clientApplication();
    const records = await healthClient.submitTxn(
      "hospital",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "queryTxn",
      "",
      "queryAllRecords"
    );

    const data = new TextDecoder().decode(records);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "All medical records retrieved successfully!",
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error querying all medical records.",
      data: { error },
    });
  }
});

// Route to create an insurance claim
router.post("/createInsuranceClaim", async (req, res) => {
  try {
    const { claimId, patientId, diagnosis, medication, testResults } = req.body;

    if (!claimId || !patientId || !diagnosis || !medication || !testResults) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
        data: {},
      });
    }

    let insuranceClient = new clientApplication();
    const transientData = {
      diagnosis: Buffer.from(diagnosis),
      medication: Buffer.from(medication),
      testResults: Buffer.from(testResults),
    };

    const result = await insuranceClient.submitTxn(
      "insurance",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "invokeTxn",
      transientData,
      "createInsuranceClaim",
      claimId,
      patientId
    );

    res.status(201).json({
      success: true,
      message: "Insurance claim created successfully!",
      data: { result },
    });
  } catch (error) {
    console.error("Error creating insurance claim:", error); // Log the error
    res.status(500).json({
      success: false,
      message: error.message || "Error creating insurance claim.",
      data: {},
    });
  }
});


// Route to get an insurance claim
router.post("/getInsuranceClaim", async (req, res) => {
  try {
    const { claimId } = req.body;
    let insuranceClient = new clientApplication();
    const claim = await insuranceClient.submitTxn(
      "insurance",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "queryTxn",
      "",
      "getInsuranceClaim",
      claimId
    );

    const data = new TextDecoder().decode(claim);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "Insurance claim retrieved successfully!",
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving insurance claim.",
      data: { error },
    });
  }
});

// Route to get private claim details
router.post("/getPrivateClaimDetails", async (req, res) => {
  try {
    const { claimId } = req.body;
    let insuranceClient = new clientApplication();
    const privateClaim = await insuranceClient.submitTxn(
      "insurance",
      "healthchannel",
      "HealthNetwork",
      "HealthcareContract",
      "queryTxn",
      "",
      "getPrivateClaimDetails",
      claimId
    );

    const data = new TextDecoder().decode(privateClaim);
    const value = JSON.parse(data);

    res.status(200).json({
      success: true,
      message: "Private claim details retrieved successfully!",
      data: value,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving private claim details.",
      data: { error },
    });
  }
});

module.exports = router;
