// src/components/MedicalExpertsManager.tsx
import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
//import MedicalExperts from './contracts/MedicalExperts.json';
import NavComponent from "../components/NavComponent";
import BottomNav from "../components/BottomNav";

const MedicalExpertsManager: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [doctorName, setDoctorName] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork();

          const contractAddress = 'YOUR_MEDICAL_EXPERTS_CONTRACT_ADDRESS';
          const medicalExpertsContract = new ethers.Contract(
            contractAddress,
            MedicalExperts.abi,
            signer
          );

          const currentAccount = await signer.getAddress();

          setContract(medicalExpertsContract);
          setAccount(currentAccount);
        } catch (error) {
          console.error('Error connecting to the blockchain: ', error);
        }
      }
    };

    loadBlockchainData();
  }, []);

  const registerDoctor = async () => {
    if (contract && account && doctorName && contactInfo) {
      try {
        const tx = await contract.registerDoctor(doctorName, contactInfo);
        await tx.wait();
        // Doctor registered successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error registering doctor: ', error);
      }
    }
  };

  const getDoctors = async () => {
    if (contract) {
      try {
        const doctorList = await contract.getDoctor();
        // Handle the doctor list data
      } catch (error) {
        console.error('Error fetching doctors: ', error);
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

        
      <div className="ml-60 items-end justify-center  max-w-xl">
     
     
        
     <article
 className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
 <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
  
 <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-4">Medical Experts</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Register Doctor</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Doctor Name"
            onChange={(e) => setDoctorName(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Contact Info"
            onChange={(e) => setContactInfo(e.target.value)}
            className="border rounded p-2 ml-2"
          />
          <button
            onClick={registerDoctor}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Register
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Doctors</h2>
        <button onClick={getDoctors} className="bg-blue-500 text-white p-2 rounded mt-2">
          Get Doctors
        </button>
        {/* Display the list of doctors here */}
      </div>
    </div>  <a href="#">
     
   </a>

   <div className="mt-4 flex flex-wrap gap-1">
     
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

export default MedicalExpertsManager;