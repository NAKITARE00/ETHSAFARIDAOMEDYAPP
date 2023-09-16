/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import * as React from "react";
import Hero from "../components/Hero";
import HiddenGems from "../components/HiddenGems";
import LatestNft from "../components/LatestNft";
import NavComponent from "../components/NavComponent";
import BottomNav from "../components/BottomNav";
import TopCollection from "../components/TopCollection";
//import Upload from "./artifacts/contracts/Drive.sol/Upload.json";
import { useState, useEffect } from "react";
//import { ethers } from "ethers";
import FileUpload from "../components/FileUpload";
import Display from "../components/Display";
import Modal from "../components/Modal";
import Appointment from "../components/Appointment";



function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    //const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//  const contract = new ethers.Contract(
          // contractAddress,
          // Upload.abi,
          signer
        // );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    
    <div className="relative w-full min-h-screen overflow-hidden px-3">
      <div className="absolute top-0 left-[50%] ">
        <div className="bg-[#73E0A9] w-[849px] h-[825px] filter blur-[509px]"></div>
        <div className="bg-[#5B68DF] w-[999px] h-[971px] filter blur-[509px]"></div>
      </div>
      {!modalOpen && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <h1 className="text-white text-2xl mb-4">Decentralised Gdrive 2.0</h1>
        <p className="text-white">
          Account: {account ? account : "Not connected"}
        </p>
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
         
      <Appointment />
      </div>
     
      <NavComponent />
      <BottomNav />
      {/* <Hero /> */}
      {/*<HiddenGems />*/}
      {/*<TopCollection />*/}

      <div className="absolute bottom-0 left-0  ">
        <div className="bg-[#73E0A9] absolute w-[849px] h-[825px] filter blur-[509px]"></div>
        <div className="bg-[#5B68DF] absolute w-[999px] h-[971px] filter blur-[509px]"></div>
      </div>

     {/* <LatestNft />*/}
    </div>
  
  );
}
export default App;