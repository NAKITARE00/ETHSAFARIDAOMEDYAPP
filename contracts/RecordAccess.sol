//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "./PatientManagement.sol";
import "./MedicalExperts.sol";

contract RecordAccess {
    PatientManagement patientManagement = new PatientManagement();
    MedicalExperts medicalExperts = new MedicalExperts();
    mapping(address => mapping(address => bool)) public authorizedDoctors;
    event AccessRequested(address indexed patient, address indexed doctor);
    event AccessGranted(address indexed patient, address indexed doctor);
    event PatientRecordsViewed(
        address indexed patient,
        uint256 patientheight,
        uint256 patientweight
    );
    event patientImageViewed(string patient_Image);

    struct MedicalRecord {
        uint256 height;
        uint256 weight;
        string imageHash;
    }
    mapping(address => string) patientToImage;

    function requestAccessToPatientRecords(address _patient) external {
        require(
            medicalExperts.hasRole(medicalExperts.DOCTOR_ROLE(), msg.sender),
            "You cannot request"
        );
        require(
            !(authorizedDoctors[_patient][msg.sender] = true),
            "Access Already granted"
        );
        emit AccessRequested(_patient, msg.sender);
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

    modifier onlyAuthorizedDoctors(address _patient) {
        require(
            authorizedDoctors[_patient][msg.sender],
            "You are not authorized to view this patient's records"
        );
        _;
    }

    function viewPatientRecords(
        address _patient
    ) external onlyAuthorizedDoctors(_patient) returns (uint256, uint256) {
        MedicalRecord memory medicalRecord;
        (
            medicalRecord.height,
            medicalRecord.weight,
            medicalRecord.imageHash
        ) = patientManagement.getMedicalRecord(_patient);

        patientToImage[_patient] = medicalRecord.imageHash;
        emit PatientRecordsViewed(
            _patient,
            medicalRecord.height,
            medicalRecord.weight
        );
        return (medicalRecord.height, medicalRecord.weight);
    }

    function viewPatientRecordsImage(
        address _patient
    ) external onlyAuthorizedDoctors(_patient) returns (string memory) {
        string memory patientImage = patientToImage[_patient];
        emit patientImageViewed(patientImage);
        return (patientImage);
    }
}
