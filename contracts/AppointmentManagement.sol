//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./AppointmentManagement.sol";
import "./MedicalExperts.sol";

contract AppointmentManagement {
    MedicalExperts medicalExperts = new MedicalExperts();
    enum AppointmentStatus {
        Requested,
        Approved,
        Canceled
    }

    struct Appointment {
        uint256 id;
        address patient;
        address doctor;
        uint256 timestamp;
        AppointmentStatus status;
    }

    uint256 public nextAppointmentId;
    mapping(uint256 => Appointment) public appointments;

    event AppointmentRequested(
        uint256 appointmentId,
        address indexed patient,
        address indexed doctor,
        uint256 timestamp
    );
    event AppointmentApproved(
        uint256 appointmentId,
        address indexed patient,
        address indexed doctor,
        uint256 timestamp
    );
    event AppointmentCanceled(
        uint256 appointmentId,
        address indexed patient,
        address indexed doctor,
        uint256 timestamp
    );
    modifier onlyDoctor() {
        require(
            medicalExperts.hasRole(medicalExperts.DOCTOR_ROLE(), msg.sender),
            "Caller is not a doctor"
        );
        _;
    }

    function requestAppointment(address _doctor, uint256 _timestamp) external {
        require(_doctor != address(0), "Doctor address cannot be zero");
        require(
            _timestamp > block.timestamp,
            "Appointments must be scheduled in the future"
        );

        Appointment storage appointment = appointments[nextAppointmentId];
        appointment.id = nextAppointmentId;
        appointment.patient = msg.sender;
        appointment.doctor = _doctor;
        appointment.timestamp = _timestamp;
        appointment.status = AppointmentStatus.Requested;

        emit AppointmentRequested (
            nextAppointmentId,
            msg.sender,
            _doctor,
            _timestamp
        );

        nextAppointmentId++;
    }

    function approveAppointment(uint256 _appointmentId) external onlyDoctor {
        Appointment storage appointment = appointments[_appointmentId];
        require(
            appointment.status == AppointmentStatus.Requested,
            "Appointment cannot be approved"
        );

        appointment.status = AppointmentStatus.Approved;

        emit AppointmentApproved(
            _appointmentId,
            appointment.patient,
            appointment.doctor,
            appointment.timestamp
        );
    }

    function cancelAppointment(uint256 _appointmentId) external {
        Appointment storage appointment = appointments[_appointmentId];
        require(
            appointment.patient == msg.sender,
            "Only the patient can cancel the appointment"
        );
        require(
            appointment.status == AppointmentStatus.Requested,
            "Appointment cannot be canceled"
        );

        appointment.status = AppointmentStatus.Canceled;

        emit AppointmentCanceled(
            _appointmentId,
            appointment.patient,
            appointment.doctor,
            appointment.timestamp
        );
    }
}
