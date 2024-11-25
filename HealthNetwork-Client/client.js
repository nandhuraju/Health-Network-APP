const { profile } = require("./profile");
const { promises: fs } = require("fs");
const path = require("path");
const crypto = require("crypto");
const grpc = require("@grpc/grpc-js");
const { connect, signers } = require("@hyperledger/fabric-gateway");

class clientApplication {
  async submitTxn(
    organization,
    channelName,
    chaincodeName,
    contractName,
    txnType,
    transientData,
    txnName,
    ...args
  ) {
    let orgProfile = profile[organization];

    const client = await newGrpcConnection(
      orgProfile["tlsCertPath"],
      orgProfile["peerEndpoint"],
      orgProfile["peerHostAlias"]
    );

    const gateway = connect({
      client,
      identity: await newIdentity(orgProfile["certPath"], orgProfile["mspId"]),
      signer: await newSigner(orgProfile["keyDirectoryPath"]),
    });

    try {
      let network = await gateway.getNetwork(channelName);
      let contract = await network.getContract(chaincodeName, contractName);

      let resultBytes;

      // Endorsement logic based on txnType
      const endorsementPolicies = {
        invokeTxn: [
          "HospitalMSP",
          "InsuranceMSP",
          "PharmacyMSP",
          "LaboratoryMSP",
        ], // For hospital and insurance
        queryTxn: [], // No endorsement needed for queries, usually read-only
        privateTxn: [], // For private transactions, you can set the endorsing orgs as per the case
        pharmacyTxn: ["PharmacyMSP", "HospitalMSP"], // Pharmacy and Hospital for pharmacy related txn
        laboratoryTxn: ["LaboratoryMSP", "HospitalMSP"], // Laboratory and Hospital for laboratory related txn
        insuranceTxn: [
          "InsuranceMSP",
          "HospitalMSP",
          "PharmacyMSP",
          "LaboratoryMSP"
        ], // Insurance and Hospital for insurance related txn
      };

      const endorsingOrganizations = endorsementPolicies[txnType];

      if (!endorsingOrganizations) {
        console.log("Invalid txnType", txnType);
        return Promise.reject(new Error(`Invalid txnType: ${txnType}`));
      }

      // Define endorsing organizations and the transaction
      if (txnType === "invokeTxn") {
        resultBytes = await contract.submitTransaction(txnName, ...args);
      } else if (txnType === "queryTxn") {
        resultBytes = await contract.evaluateTransaction(txnName, ...args);
      } else if (txnType === "privateTxn") {
        resultBytes = await contract.submit(txnName, {
          arguments: [...args],
          transientData: transientData,
          endorsingOrganizations: endorsingOrganizations, // Set endorsing orgs for private txn
        });
      } else {
        resultBytes = await contract.submitTransaction(txnName, {
          arguments: [...args],
          endorsingOrganizations: endorsingOrganizations, // For other txns, apply the right endorsing orgs
        });
      }

      console.log("*** Result:", resultBytes);

      return Promise.resolve(resultBytes);
    } catch (error) {
      console.log("Error occurred", error);
      return Promise.reject(error);
    } finally {
      gateway.close();
      client.close();
    }
  }
}

async function newGrpcConnection(tlsCertPath, peerEndpoint, peerHostAlias) {
  const tlsRootCert = await fs.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    "grpc.ssl_target_name_override": peerHostAlias,
  });
}

async function newIdentity(certPath, mspId) {
  const credentials = await fs.readFile(certPath);
  return { mspId, credentials };
}

async function newSigner(keyDirectoryPath) {
  const files = await fs.readdir(keyDirectoryPath);
  const keyPath = path.resolve(keyDirectoryPath, files[0]);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

module.exports = {
  clientApplication,
};
