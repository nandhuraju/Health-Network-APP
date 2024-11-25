let profile = {
    hospital: {
        "cryptoPath": "../../Health_Network_Fabric/organizations/peerOrganizations/hospital.healthnetwork.com", 
		"keyDirectoryPath": "../../Health_Network_Fabric/organizations/peerOrganizations/hospital.healthnetwork.com/users/User1@hospital.healthnetwork.com/msp/keystore/",
        "certPath":     "../../Health_Network_Fabric/organizations/peerOrganizations/hospital.healthnetwork.com/users/User1@hospital.healthnetwork.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Health_Network_Fabric/organizations/peerOrganizations/hospital.healthnetwork.com/peers/peer0.hospital.healthnetwork.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.hospital.healthnetwork.com",
        "mspId": "HospitalMSP"
    },
    pharmacy: {
        "cryptoPath": "../../Health_Network_Fabric/organizations/peerOrganizations/pharmacy.healthnetwork.com", 
		"keyDirectoryPath": "../../Health_Network_Fabric/organizations/peerOrganizations/pharmacy.healthnetwork.com/users/User1@pharmacy.healthnetwork.com/msp/keystore/",
        "certPath":     "../../Health_Network_Fabric/organizations/peerOrganizations/pharmacy.healthnetwork.com/users/User1@pharmacy.healthnetwork.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Health_Network_Fabric/organizations/peerOrganizations/pharmacy.healthnetwork.com/peers/peer0.pharmacy.healthnetwork.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.pharmacy.healthnetwork.com",
        "mspId": "PharmacyMSP"
    },
    insurance: {
        "cryptoPath": "../../Health_Network_Fabric/organizations/peerOrganizations/insurance.healthnetwork.com", 
		"keyDirectoryPath": "../../Health_Network_Fabric/organizations/peerOrganizations/insurance.healthnetwork.com/users/User1@insurance.healthnetwork.com/msp/keystore/",
        "certPath":     "../../Health_Network_Fabric/organizations/peerOrganizations/insurance.healthnetwork.com/users/User1@insurance.healthnetwork.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Health_Network_Fabric/organizations/peerOrganizations/insurance.healthnetwork.com/peers/peer0.insurance.healthnetwork.com/tls/ca.crt",
		"peerEndpoint": "localhost:11051",
		"peerHostAlias":  "peer0.insurance.healthnetwork.com",
        "mspId": "InsuranceMSP"
    },
    laboratory: {
        "cryptoPath": "../../Health_Network_Fabric/organizations/peerOrganizations/laboratory.healthnetwork.com", 
		"keyDirectoryPath": "../../Health_Network_Fabric/organizations/peerOrganizations/laboratory.healthnetwork.com/users/User1@laboratory.healthnetwork.com/msp/keystore/",
        "certPath":     "../../Health_Network_Fabric/organizations/peerOrganizations/laboratory.healthnetwork.com/users/User1@laboratory.healthnetwork.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../Health_Network_Fabric/organizations/peerOrganizations/laboratory.healthnetwork.com/peers/peer0.laboratory.healthnetwork.com/tls/ca.crt",
		"peerEndpoint": "localhost:12051",
		"peerHostAlias":  "peer0.laboratory.healthnetwork.com",
        "mspId": "LaboratoryMSP"
    }
}
module.exports = { profile }
