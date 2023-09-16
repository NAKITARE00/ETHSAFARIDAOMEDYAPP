// src/components/PatientManagementManager.tsx
import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
//import PatientManagement from '../contracts/PatientManagement.json';
import NavComponent from "../components/NavComponent";
import BottomNav from "../components/BottomNav";

const PatientManagementManager: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [patientName, setPatientName] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [imageHash, setImageHash] = useState<string>('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork();

          const contractAddress = 'YOUR_PATIENT_MANAGEMENT_CONTRACT_ADDRESS';
          const patientManagementContract = new ethers.Contract(
            contractAddress,
            PatientManagement.abi,
            signer
          );

          const currentAccount = await signer.getAddress();

          setContract(patientManagementContract);
          setAccount(currentAccount);
        } catch (error) {
          console.error('Error connecting to the blockchain: ', error);
        }
      }
    };

    loadBlockchainData();
  }, []);

  const registerPatient = async () => {
    if (contract && account && patientName && contactInfo) {
      try {
        const tx = await contract.registerPatient(patientName, contactInfo);
        await tx.wait();
        // Patient registered successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error registering patient: ', error);
      }
    }
  };

  const createMedicalRecord = async () => {
    if (contract && account && height && weight) {
      try {
        const tx = await contract.createMedicalRecord(height, weight);
        await tx.wait();
        // Medical record created successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error creating medical record: ', error);
      }
    }
  };

  const addImageHash = async () => {
    if (contract && account && imageHash) {
      try {
        const tx = await contract.addImageHash(imageHash);
        await tx.wait();
        // Image hash added to the medical record successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error adding image hash: ', error);
      }
    }
  };

  const getMedicalRecord = async () => {
    if (contract) {
      try {
        const [recordHeight, recordWeight, recordImageHash] =
          await contract.getMedicalRecord(account);

        // Handle the medical record data
        console.log('Medical Record Height:', recordHeight.toNumber());
        console.log('Medical Record Weight:', recordWeight.toNumber());
        console.log('Medical Record Image Hash:', recordImageHash);

      } catch (error) {
        console.error('Error fetching medical record: ', error);
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden px-3">
      <div className="absolute top-0 left-[50%] ">
        <div className="bg-[#73E0A9] w-[849px] h-[825px] filter blur-[509px]"></div>
        <div className="bg-[#5B68DF] w-[999px] h-[971px] filter blur-[509px]"></div>
      </div>

      <NavComponent /> 
        
        <BottomNav /> 

    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-4">Patient Management</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Register Patient</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Patient Name"
            onChange={(e) => setPatientName(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Contact Info"
            onChange={(e) => setContactInfo(e.target.value)}
            className="border rounded p-2 ml-2"
          />
          <button
            onClick={registerPatient}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Register
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Create Medical Record</h2>
        <div className="mt-2">
          <input
            type="number"
            placeholder="Height"
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Weight"
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="border rounded p-2 ml-2"
          />
          <button
            onClick={createMedicalRecord}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Create Record
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Add Image Hash</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Image Hash"
            onChange={(e) => setImageHash(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={addImageHash}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Add Image Hash
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Get Medical Record</h2>
        <button
          onClick={getMedicalRecord}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Get Medical Record
        </button>
        {/* Display the medical record data here */}
      </div>
    </div>

    <div className="absolute bottom-0 left-0  ">
        <div className="bg-[#73E0A9] absolute w-[849px] h-[825px] filter blur-[509px]"></div>
        <div className="bg-[#5B68DF] absolute w-[999px] h-[971px] filter blur-[509px]"></div>
      </div>

     {/* <LatestNft />*/}
    </div>
  );
};

export default PatientManagementManager;