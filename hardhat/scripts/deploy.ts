const { ethers } = require("hardhat");

const main = async () => {
  
  // const Afya = await ethers.getContractFactory("Afya"); // Afya contract
  // const afya = await Afya.deploy(); // Afya contract instance
  // await afya.deployed(); // wait for contract to be deployed
  // const afyaAddress = await afya.address; // Afya contract address

  const AppointmentManagement = await ethers.getContractFactory("AppointmentManagement"); // AppointmentManagement contract
  const appointmentManagement = await AppointmentManagement.deploy(); // AppointmentManagement contract instance
  await appointmentManagement.deployed(); // wait for contract to be deployed
  const appointmentManagementAddress = await appointmentManagement.address; // AppointmentManagement contract address

  const MedicalExperts = await ethers.getContractFactory("MedicalExperts"); // MedicalExperts contract
  const medicalExperts = await MedicalExperts.deploy(); // MedicalExperts contract instance
  await medicalExperts.deployed(); // wait for contract to be deployed
  const medicalExpertsAddress = await medicalExperts.address; // MedicalExperts contract address

  const PatientManagement = await ethers.getContractFactory("PatientManagement"); // PatientManagement contract
  const patientManagement = await PatientManagement.deploy(); // PatientManagement contract instance
  await patientManagement.deployed(); // wait for contract to be deployed
  const patientManagementAddress = await patientManagement.address; // PatientManagement contract address

  const RecordAccess = await ethers.getContractFactory("RecordAccess"); // RecordAccess contract
  const recordAccess = await RecordAccess.deploy(); // RecordAccess contract instance
  await recordAccess.deployed(); // wait for contract to be deployed
  const recordAccessAddress = await recordAccess.address; // RecordAccess contract address
  


  //  console.log(`Afya deployed to: ${afyaAddress}`);
  console.log(`AppointmentManagement deployed to: ${appointmentManagementAddress}`);
  console.log(`MedicalExperts deployed to: ${medicalExpertsAddress}`);
  console.log(`PatientManagement deployed to: ${patientManagementAddress}`);
  console.log(`AppointmentManagement deployed to: ${appointmentManagementAddress}`);
  console.log(`RecordAccess deployed to: ${recordAccessAddress}`);
  
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });