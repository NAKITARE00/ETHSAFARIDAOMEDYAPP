// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";
import "./AppointmentManagement.sol";

contract MedicalExperts is AccessControl {
    bytes32 public constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");
    address payable owner;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        owner = payable(msg.sender);
    }

    struct Doctor {
        string doctorName;
        string contactInfo;
    }

    mapping(address => Doctor) public doctors;
    Doctor[] doctorlist;

    function registerDoctor(
        string memory _doctorName,
        string memory _contactInfo
    ) external {
        doctors[msg.sender] = Doctor(_doctorName, _contactInfo);
        doctorlist.push(Doctor(_doctorName, _contactInfo));
        grantRole(DOCTOR_ROLE, msg.sender);
    }

    function getDoctor() external view returns (Doctor[] memory) {
        return doctorlist;
    }

}
