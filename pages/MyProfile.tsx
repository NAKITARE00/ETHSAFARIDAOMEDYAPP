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
      
      
      <BottomNav />
      {/* <Hero /> */}
      {/*<HiddenGems />*/}
      {/*<TopCollection />*/}

      <div className="absolute bottom-0 left-0  ">
        <div className="bg-[#73E0A9] absolute w-[849px] h-[825px] filter blur-[509px]"></div>
        <div className="bg-[#5B68DF] absolute w-[999px] h-[971px] filter blur-[509px]"></div>
      </div>

      <div className="ml-60 items-end justify-center  max-w-xl">
     
     
        
      <article
  className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
  <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
   
  <Appointment />
    <a href="#">
      
    </a>

    <div className="mt-4 flex flex-wrap gap-1">
      
    </div>
  </div>
</article>
</div>

     {/* <LatestNft />*/}
    </div>
  
  );
}
export default App;