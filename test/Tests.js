const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AppointmentManagement", function () {
  let AppointmentManagement;
  let appointmentManagement;
  let owner;
  let doctor;
  let patient;

  beforeEach(async function () {
    [owner, doctor, patient] = await ethers.getSigners();

    // Deploy the AppointmentManagement contract
    AppointmentManagement = await ethers.getContractFactory("AppointmentManagement");
    appointmentManagement = await AppointmentManagement.deploy();
    
  });

  it("should allow a patient to request an appointment", async function () {
    const timestamp = Math.floor(Date.now() / 1000) + 3600; // Schedule an appointment 1 hour in the future

    await appointmentManagement.connect(patient).requestAppointment(doctor.address, timestamp);

    const appointment = await appointmentManagement.appointments(0);
    expect(appointment.status).to.equal(0); // 0 corresponds to AppointmentStatus.Requested
    expect(appointment.patient).to.equal(patient.address);
    expect(appointment.doctor).to.equal(doctor.address);
  });

  

  
});
