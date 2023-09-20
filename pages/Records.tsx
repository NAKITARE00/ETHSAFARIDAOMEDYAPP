// src/components/RecordAccessManager.tsx
import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
//import RecordAccess from './contracts/RecordAccess.json';
import NavComponent from "../components/NavComponent";
import BottomNav from "../components/BottomNav";

const RecordAccessManager: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [patientAddress, setPatientAddress] = useState<string>('');
  const [doctorAddress, setDoctorAddress] = useState<string>('');
  const [authorizedDoctors, setAuthorizedDoctors] = useState<string[]>([]);
  const [patientHeight, setPatientHeight] = useState<number | null>(null);
  const [patientWeight, setPatientWeight] = useState<number | null>(null);
  const [patientImage, setPatientImage] = useState<string>('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork();

          const contractAddress = 'YOUR_RECORD_ACCESS_CONTRACT_ADDRESS';
          const recordAccessContract = new ethers.Contract(
            contractAddress,
            RecordAccess.abi,
            signer
          );

          const currentAccount = await signer.getAddress();

          setContract(recordAccessContract);
          setAccount(currentAccount);
        } catch (error) {
          console.error('Error connecting to the blockchain: ', error);
        }
      }
    };

    loadBlockchainData();
  }, []);

  const requestAccessToPatientRecords = async () => {
    if (contract && account && patientAddress) {
      try {
        await contract.requestAccessToPatientRecords(patientAddress);
        // Access request sent successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error sending access request: ', error);
      }
    }
  };

  const grantAccessToDoctor = async () => {
    if (contract && account && doctorAddress) {
      try {
        await contract.grantAccessToDoctor(doctorAddress);
        // Access granted to the doctor successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error granting access: ', error);
      }
    }
  };

  const viewPatientRecords = async () => {
    if (contract && account && patientAddress) {
      try {
        const [height, weight] = await contract.viewPatientRecords(patientAddress);
        setPatientHeight(height.toNumber());
        setPatientWeight(weight.toNumber());
        // Patient records retrieved successfully
        // You can update the UI with the patient's height and weight here
      } catch (error) {
        console.error('Error viewing patient records: ', error);
      }
    }
  };

  const viewPatientRecordsImage = async () => {
    if (contract && account && patientAddress) {
      try {
        const imageHash = await contract.viewPatientRecordsImage(patientAddress);
        setPatientImage(imageHash);
        // Patient image hash retrieved successfully
        // You can update the UI with the patient's image here
      } catch (error) {
        console.error('Error viewing patient image: ', error);
      }
    }
  };

  useEffect(() => {
    const fetchAuthorizedDoctors = async () => {
      if (contract && account) {
        try {
          const doctors = await contract.authorizedDoctors(account);
          setAuthorizedDoctors(doctors);
        } catch (error) {
          console.error('Error fetching authorized doctors: ', error);
        }
      }
    };

    fetchAuthorizedDoctors();
  }, [contract, account]);

  return (
    
      <div className="relative w-full min-h-screen overflow-hidden px-3">
        <div className="absolute top-0 left-[50%] ">
          <div className="bg-[#73E0A9] w-[849px] h-[825px] filter blur-[509px]"></div>
          <div className="bg-[#5B68DF] w-[999px] h-[971px] filter blur-[509px]"></div>
        </div>
         <NavComponent /> 
        
        <BottomNav /> 
        {/*<HiddenGems />*/}
        {/*<TopCollection />*/}


 
        
      <div className="relative z-8 min-w-xl mt-10 mr-50 h-[60vh] flex flex-col justify-center items-center">
        
<article
  className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
  <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
    

    

    <div className="container text-center mx-auto">
      <h1 className="text-2xl font-bold mt-4">Record Access Management</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Request Access to Patient Records</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Patient Address"
            onChange={(e) => setPatientAddress(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={requestAccessToPatientRecords}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Request Access
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Grant Access to Doctor</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Doctor Address"
            onChange={(e) => setDoctorAddress(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={grantAccessToDoctor}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Grant Access
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">View Patient Records</h2>
        <button
          onClick={viewPatientRecords}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          View Records
        </button>
        <p>Height: {patientHeight}</p>
        <p>Weight: {patientWeight}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">View Patient Image</h2>
        <button
          onClick={viewPatientRecordsImage}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          View Image
        </button>
        <p>Image Hash: {patientImage}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Authorized Doctors</h2>
        <ul>
          {authorizedDoctors.map((doctor, index) => (
            <li key={index}>{doctor}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</article>
</div>
        
    
    

    <div className="absolute bottom-0 left-0  ">
          <div className="bg-[#73E0A9] absolute w-[849px] h-[825px] filter blur-[509px]"></div>
          <div className="bg-[#5B68DF] absolute w-[999px] h-[971px] filter blur-[509px]"></div>
        </div>
  
       {/* <LatestNft />*/}
      </div>
  );
};

export default RecordAccessManager;
