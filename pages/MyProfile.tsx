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
      <NavComponent />
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
      
      <div>
        <h1 className="text-white text-2xl mb-4">Decentralised Gdrive 2.0</h1>
        <p className="text-white">
          Account: {account ? account : "Not connected"}
        </p>
        <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">

  <div className=" max-w-sm items-center gap-4">
    <img
      alt="Developer"
      src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
      className="h-16 w-16 rounded-full object-cover"
    />

    <div>
      <h3 className="text-lg font-medium text-white">Claire Mac</h3>

      <div className="flow-root">
        <ul className="-m-1 flex flex-wrap">
          <li className="p-1 leading-none">
            <a href="#" className="text-xs font-medium text-gray-300"> Twitter </a>
          </li>

          <li className="p-1 leading-none">
            <a href="#" className="text-xs font-medium text-gray-300"> GitHub </a>
          </li>

          <li className="p-1 leading-none">
            <a href="#" className="text-xs font-medium text-gray-300">Website</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <ul className="mt-4 space-y-2">
    <li>
      <a
        href="#"
        className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
      >
        <strong className="font-medium text-white">Project A</strong>

        <p className="mt-1 text-xs font-medium text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          consequuntur deleniti, unde ab ut in!
        </p>
      </a>
    </li>

    <li>
      <a
        href="#"
        className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
      >
        <strong className="font-medium text-white">Project B</strong>

        <p className="mt-1 text-xs font-medium text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
          cumque saepe sit.
        </p>
      </a>
    </li>
  </ul>
</article>
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
         
      <Appointment />
      </div>
     
      
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