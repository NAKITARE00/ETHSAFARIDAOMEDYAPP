import { expect } from "chai";
import { ethers } from "hardhat";
import { AppointmentManagement } from "../typechain-types"; // Update with your contract type

describe("AppointmentManagement", function () {
  let appointmentManagement: AppointmentManagement;
  let owner;
  let doctor;
  let patient;

  before(async () => {
    [owner, doctor, patient] = await ethers.getSigners();
    const AppointmentManagementFactory = await ethers.getContractFactory("AppointmentManagement");
    appointmentManagement = (await AppointmentManagementFactory.deploy()) as AppointmentManagement;
    await appointmentManagement.deployed();
  });

  describe("Appointment Request", function () {
    it("Should allow a patient to request an appointment", async function () {
      const timestamp = Math.floor(Date.now() / 1000) + 3600; // One hour from now
      await appointmentManagement.connect(patient).requestAppointment(doctor.address, timestamp);

      const appointment = await appointmentManagement.appointments(0);
      expect(appointment.patient).to.equal(patient.address);
      expect(appointment.doctor).to.equal(doctor.address);
      expect(appointment.status).to.equal(0); // 0 corresponds to Requested in the enum
    });
  });

  describe("Appointment Approval", function () {
    it("Should allow a doctor to approve an appointment", async function () {
      await appointmentManagement.connect(doctor).approveAppointment(0);

      const appointment = await appointmentManagement.appointments(0);
      expect(appointment.status).to.equal(1); // 1 corresponds to Approved in the enum
    });
  });

  describe("Appointment Cancellation", function () {
    it("Should allow a patient to cancel an appointment", async function () {
      await appointmentManagement.connect(patient).cancelAppointment(0);

      const appointment = await appointmentManagement.appointments(0);
      expect(appointment.status).to.equal(2); // 2 corresponds to Canceled in the enum
    });
  });
});