// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract PatientManagement is AccessControl {
    bytes32 public constant PATIENT_ROLE = keccak256("PATIENT_ROLE");
    address payable owner;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        owner = payable(msg.sender);
    }

    //Initiating patient's contact and name in a structure, then mapping it to an address
    struct Patient {
        string patientName;
        string contactInfo;
    }

    mapping(address => Patient) public patients;

    //Initating a struct for the medical record, mapping to an address
    struct MedicalRecord {
        uint256 height;
        uint256 weight;
        string imageHash;
    }
    mapping(address => MedicalRecord) public medicalRecords;

    function registerPatient(
        string memory _patientName,
        string memory _contactInfo
    ) public {
        patients[msg.sender] = Patient(_patientName, _contactInfo);
        grantRole(PATIENT_ROLE, msg.sender);
    }

    // function grantAccess(address _doctorAddress) external {
    //    require(hasRole(PATIENT_ROLE, msg.sender), "Caller is not a patient");
    //     grantRole(DEFAULT_ADMIN_ROLE, _doctorAddress);
    // }

    function createMedicalRecord(uint256 _height, uint256 _weight) external {
        require(
            hasRole(PATIENT_ROLE, msg.sender),
            "Only Patient Can Make Record Change"
        );
        medicalRecords[msg.sender] = MedicalRecord(_height, _weight, "");
    }

    function addImageHash(string memory _imageHash) external {
        require(
            hasRole(PATIENT_ROLE, msg.sender),
            "Only Patient Can Make Record Change"
        );
        medicalRecords[msg.sender].imageHash = _imageHash;
    }

    function updateMedicalRecord(
        address _patientaddress,
        uint256 _height,
        uint256 _weight
    ) external {
        require(
            _patientaddress == msg.sender,
            "Only Patient Can Make A Record Change"
        );
        medicalRecords[_patientaddress] = MedicalRecord(_height, _weight, "");
    }

    function getMedicalRecord(
        address _patientAddress
    ) external view returns (MedicalRecord memory) {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, address(this)),
            "Can't access Medical Record"
        );
        return medicalRecords[_patientAddress];
    }
}
