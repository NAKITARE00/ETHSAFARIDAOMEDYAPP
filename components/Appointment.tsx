// src/components/AppointmentManager.tsx
import React, { useState, useEffect } from 'react';
//import { ethers } from 'ethers';
//import AppointmentManagement from './contracts/AppointmentManagement.json';

const AppointmentManager: React.FC = () => {
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [doctorAddress, setDoctorAddress] = useState<string>('');
  const [timestamp, setTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork();

          const contractAddress = 'YOUR_CONTRACT_ADDRESS';
          const appointmentContract = new ethers.Contract(
            contractAddress,
            AppointmentManagement.abi,
            signer
          );

          const currentAccount = await signer.getAddress();

          setContract(appointmentContract);
          setAccount(currentAccount);
        } catch (error) {
          console.error('Error connecting to the blockchain: ', error);
        }
      }
    };

    loadBlockchainData();
  }, []);

  const requestAppointment = async () => {
    if (contract && account && doctorAddress && timestamp) {
      try {
        const tx = await contract.requestAppointment(doctorAddress, timestamp);
        await tx.wait();
        // Appointment requested successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error requesting appointment: ', error);
      }
    }
  };

  const approveAppointment = async (appointmentId: number) => {
    if (contract && account) {
      try {
        const tx = await contract.approveAppointment(appointmentId);
        await tx.wait();
        // Appointment approved successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error approving appointment: ', error);
      }
    }
  };

  const cancelAppointment = async (appointmentId: number) => {
    if (contract && account) {
      try {
        const tx = await contract.cancelAppointment(appointmentId);
        await tx.wait();
        // Appointment canceled successfully
        // You can add a success message or update the UI here
      } catch (error) {
        console.error('Error canceling appointment: ', error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-4">Appointment Management</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Request Appointment</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Doctor Address"
            onChange={(e) => setDoctorAddress(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Timestamp"
            onChange={(e) => setTimestamp(parseInt(e.target.value))}
            className="border rounded p-2 ml-2"
          />
          <button
            onClick={requestAppointment}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Request
          </button>
        </div>
      </div>
      {/* Add the list of appointments and approve/cancel functionality here */}
    </div>
  );
};

export default AppointmentManager;
