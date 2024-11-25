"use strict";

const { Contract } = require("fabric-contract-api");

class HealthcareContract extends Contract {
  // Role check functions
  async _isHospital(ctx) {
    const mspId = ctx.clientIdentity.getMSPID();
    if (mspId !== "HospitalMSP") {
      throw new Error("Only the hospital can perform this action.");
    }
  }

  async _isPharmacy(ctx) {
    const mspId = ctx.clientIdentity.getMSPID();
    if (mspId !== "PharmacyMSP") {
      throw new Error("Only the pharmacy can update medication.");
    }
  }

  async _isLaboratory(ctx) {
    const mspId = ctx.clientIdentity.getMSPID();
    if (mspId !== "LaboratoryMSP") {
      throw new Error("Only the laboratory can update test results.");
    }
  }

  async _isInsurance(ctx) {
    const mspId = ctx.clientIdentity.getMSPID();
    if (mspId !== "InsuranceMSP") {
      throw new Error(
        "Only the insurance organization can perform this action."
      );
    }
  }

  // Check if a record exists
  async recordExists(ctx, patientId) {
    const buffer = await ctx.stub.getState(patientId);
    return buffer && buffer.length > 0;
  }

  // Create a medical record
  async createMedicalRecord(ctx, patientId, name, diagnosis) {
    await this._isHospital(ctx);

    const recordExists = await this.recordExists(ctx, patientId);
    if (recordExists) {
      throw new Error(`Record for patient ${patientId} already exists.`);
    }

    const record = {
      patientId,
      name,
      diagnosis,
      medication: "",
      testResults: "",
      paymentStatus: "Not Paid",
      docType: "medicalRecord",
    };

    await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));

    const eventPayload = {
      Type: "MedicalRecordCreation",
      PatientId: patientId,
    };
    await ctx.stub.setEvent(
      "createMedicalRecordEvent",
      Buffer.from(JSON.stringify(eventPayload))
    );

    return JSON.stringify(record);
  }

  // Get a medical record
  async getMedicalRecord(ctx, patientId) {
    const buffer = await ctx.stub.getState(patientId);
    if (!buffer || buffer.length === 0) {
      throw new Error(`Medical record ${patientId} does not exist.`);
    }
    return JSON.parse(buffer.toString());
  }

  // Update medication for a record
  async updateMedication(ctx, patientId, medication) {
    await this._isPharmacy(ctx);

    const record = await this.getMedicalRecord(ctx, patientId);
    record.medication = medication;

    await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));
    return JSON.stringify(record);
  }

  // Update test results for a record
  async updateTestResults(ctx, patientId, testResults) {
    await this._isLaboratory(ctx);

    const record = await this.getMedicalRecord(ctx, patientId);
    record.testResults = testResults;

    await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));
    return JSON.stringify(record);
  }

  // Query all medical records
  async queryAllRecords(ctx) {
    const queryString = { selector: { docType: "medicalRecord" } };
    const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    const result = await this._getAllResults(iterator);
    return JSON.stringify(result);
  }

  
  // Create an insurance claim with transient data
  async createInsuranceClaim(ctx, claimId, patientId) {
    await this._isInsurance(ctx);

    const claimExists = await this.claimExists(ctx, claimId);
    if (claimExists) {
      throw new Error(`Claim ${claimId} already exists.`);
    }

    // Retrieve transient data
    const transientData = ctx.stub.getTransient();
    if (
      !transientData.has("diagnosis") ||
      !transientData.has("medication") ||
      !transientData.has("testResults")
    ) {
      throw new Error(
        "Transient data must include diagnosis, medication, and testResults."
      );
    }

    const diagnosis = transientData.get("diagnosis").toString();
    const medication = transientData.get("medication").toString();
    const testResults = transientData.get("testResults").toString();

    const record = await this.getMedicalRecord(ctx, patientId);

    // Validate transient data against medical record
    if (
      record.diagnosis === diagnosis &&
      record.medication === medication &&
      record.testResults === testResults
    ) {
      const claim = {
        claimId,
        patientId,
        diagnosis,
        medication,
        testResults,
        docType: "insuranceClaim",
      };

      await ctx.stub.putState(claimId, Buffer.from(JSON.stringify(claim)));

      const privateClaim = {
        claimId,
        patientId,
        status: "Insurance Claimed",
        approvalDetails: "Approved by Insurance",
      };

      const collectionName = "insuranceHospitalPDC";
      await ctx.stub.putPrivateData(
        collectionName,
        claimId,
        Buffer.from(JSON.stringify(privateClaim))
      );

      // Update payment status in the medical record
      record.paymentStatus = "Insurance Claimed";
      await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(record)));

      const eventPayload = { Type: "InsuranceClaimCreation", ClaimId: claimId };
      await ctx.stub.setEvent(
        "createInsuranceClaimEvent",
        Buffer.from(JSON.stringify(eventPayload))
      );

      return JSON.stringify(claim);
    } else {
      throw new Error("Claim details do not match the medical record.");
    }
  }

  // Get an insurance claim
  async getInsuranceClaim(ctx, claimId) {
    const claimBytes = await ctx.stub.getState(claimId);
    if (!claimBytes || claimBytes.length === 0) {
      throw new Error(`Insurance claim ${claimId} does not exist.`);
    }
    return claimBytes.toString();
  }

  // Get private claim details
  async getPrivateClaimDetails(ctx, claimId) {
    const collectionName = "insuranceHospitalPDC";
    const privateClaimBytes = await ctx.stub.getPrivateData(
      collectionName,
      claimId
    );
    if (!privateClaimBytes || privateClaimBytes.length === 0) {
      throw new Error(`Private claim details for ${claimId} do not exist.`);
    }
    return privateClaimBytes.toString();
  }

  // Check if claim exists
  async claimExists(ctx, claimId) {
    const claimBytes = await ctx.stub.getState(claimId);
    return claimBytes && claimBytes.length > 0;
  }

  // Query helper function
  async _getAllResults(iterator, isHistory = false) {
    const allResults = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value && res.value.value.toString()) {
        const jsonRes = {};
        if (isHistory) {
          jsonRes.TxId = res.value.txId;
          jsonRes.Timestamp = res.value.timestamp;
          jsonRes.Record = JSON.parse(res.value.value.toString());
        } else {
          jsonRes.Key = res.value.key;
          jsonRes.Record = JSON.parse(res.value.value.toString());
        }
        allResults.push(jsonRes);
      }
      res = await iterator.next();
    }
    await iterator.close();
    return allResults;
  }
}

module.exports = HealthcareContract;
