//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./PatientManagement.sol";
import "./MedicalExperts.sol";

contract RecordAccess {
    PatientManagement patientManagement = new PatientManagement();
    mapping(address => mapping(address => bool)) public authorizedDoctors;
    event AccessGranted(address indexed patient, address indexed doctor);

    struct MedicalRecord {
        uint256 height;
        uint256 weight;
        string imageHash;
    }

    function grantAccessToDoctor(address _doctor) external {
        require(
            patientManagement.hasRole(
                patientManagement.PATIENT_ROLE(),
                msg.sender
            ),
            "Only Patient Can Grant Access"
        );
        authorizedDoctors[msg.sender][_doctor] = true;
        emit AccessGranted(msg.sender, _doctor);
    }

    function viewPatientRecords(
        address _patient
    ) external returns (uint256, uint256, string memory) {
        require(
            authorizedDoctors[_patient][msg.sender],
            "You are not authorized to view this patient's records"
        );
        MedicalRecord memory medicalRecord;
        (
            medicalRecord.height,
            medicalRecord.weight,
            medicalRecord.imageHash
        ) = patientManagement.getMedicalRecord(_patient);
        return (
            medicalRecord.height,
            medicalRecord.weight,
            medicalRecord.imageHash
        );
    }
}
