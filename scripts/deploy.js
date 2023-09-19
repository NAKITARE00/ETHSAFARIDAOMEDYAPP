const { ethers } = require("hardhat");

async function main() {
  // Get the accounts that will deploy the contracts
  const [deployer, patient, doctor] = await ethers.getSigners();

  // Deploy the PatientManagement contract
  const PatientManagement = await ethers.getContractFactory("PatientManagement");
  const patientManagement = await PatientManagement.deploy();
  

  console.log("PatientManagement contract deployed to:", patientManagement.address);

  // Deploy the RecordAccess contract
  const RecordAccess = await ethers.getContractFactory("RecordAccess");
  const recordAccess = await RecordAccess.deploy();
  

  console.log("RecordAccess contract deployed to:", recordAccess.address);

  // Perform any additional setup or interactions here, if needed
  // For example, you can grant roles or set initial values.

  // Print contract addresses and other relevant information
  console.log("Deployer address:", deployer.address);
  console.log("Patient address:", patient.address);
  console.log("Doctor address:", doctor.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
