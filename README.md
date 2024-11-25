# Hyperledger Fabric Healthcare System

A decentralized healthcare management system built on **Hyperledger Fabric**, providing secure and tamper-proof management of medical records and insurance claims. This project demonstrates the use of blockchain to ensure data integrity, role-based access, and privacy-preserving mechanisms with **Private Data Collections (PDCs)**.

---

## Features
1. **Medical Record Management**:
   - Hospitals can create medical records.
   - Pharmacies can update medications.
   - Laboratories can update test results.
   - Query all records across the network.

2. **Insurance Claim Management**:
   - Insurance organizations can create claims using private and transient data.
   - Validate insurance claims against medical records.
   - Manage sensitive claim details with Private Data Collections (PDCs).

3. **Role-Based Access Control**:
   - Restricted access to functions based on organizational roles (e.g., Hospital, Pharmacy, Laboratory, Insurance).

4. **Event Emission**:
   - Emits events such as `createMedicalRecordEvent` and `createInsuranceClaimEvent` for real-time notifications.

5. **Privacy**:
   - Sensitive insurance claim details are stored in private collections and shared only with authorized parties.

---

## Smart Contract Structure
The system is implemented as a single smart contract: `HealthcareContract`.

### Key Functions
1. **Medical Record Management**:
   - `createMedicalRecord(patientId, name, diagnosis)`: Create a new medical record.
   - `getMedicalRecord(patientId)`: Retrieve a specific medical record.
   - `updateMedication(patientId, medication)`: Update medication (Pharmacy only).
   - `updateTestResults(patientId, testResults)`: Update test results (Laboratory only).
   - `queryAllRecords()`: Query all medical records.

2. **Insurance Claim Management**:
   - `createInsuranceClaim(claimId, patientId)`: Create an insurance claim with transient data (Insurance only).
   - `getInsuranceClaim(claimId)`: Retrieve a specific insurance claim.
   - `getPrivateClaimDetails(claimId)`: Retrieve sensitive claim details from PDC.

3. **Helper Functions**:
   - `_isHospital()`, `_isPharmacy()`, `_isLaboratory()`, `_isInsurance()`: Role-based checks.
   - `recordExists(patientId)`: Check if a medical record exists.
   - `claimExists(claimId)`: Check if an insurance claim exists.
   - `_getAllResults(iterator)`: Helper function for querying results.

---

## Architecture
The system consists of:
1. **Smart Contract**:
   - Defines logic for medical records and insurance claims.
   - Implements access control for organizations.

2. **Private Data Collections (PDCs)**:
   - Used to store sensitive insurance claim details.
   - Configured in `collections_config.json`.

3. **Organizations**:
   - **Hospital**: Creates medical records.
   - **Pharmacy**: Updates medications.
   - **Laboratory**: Updates test results.
   - **Insurance**: Creates and manages claims.

---

## Prerequisites
1. **Hyperledger Fabric**:
   - Fabric v2.2+ setup with Docker.
   - A channel named `healthchannel`.
   - Organizations: `HospitalMSP`, `PharmacyMSP`, `LaboratoryMSP`, `InsuranceMSP`.

2. **Node.js**:
   - Install Node.js (v14+ recommended).
   - Fabric SDK installed via `npm install fabric-network`.

3. **Setup**:
   - Clone this repository.
   - Install dependencies with `npm install`.

---

