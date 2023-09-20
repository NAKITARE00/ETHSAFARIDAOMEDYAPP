import React, { useState } from "react";
import Offers from "./Offers";
import { ethers } from "ethers";
import { addressSignatureVerification, AuthData } from "@ututrust/web-components";
import { useWeb3Modal } from '@web3modal/react';

const OFFERS = [
  {
    name: "Paul",
    id: "provider_1"
  },
  {
    name: "Jane",
    id: "provider_2"
  },
  {
    name: "Ali",
    id: "provider_3"
  }
];

function Utu() {
  const { open } = useWeb3Modal()
  const [hasToken, setHasToken] = useState(false);
  let overrideApiUrl = process.env.REACT_APP_API_URL;

  const triggerUtuIdentityDataSDKEvent = (
    identityData: AuthData
  ): void => {
    const event = new CustomEvent("utuIdentityDataReady", {
      detail: identityData,
    });
    window.dispatchEvent(event);
  };

  let onConnectToWalletClick = async () => {
    await open();
  }

  const initEntity = async (data: AuthData, offer: any) => {
    await fetch(overrideApiUrl + "/core-api-v2/entity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.access_token}`,
      },
      body: JSON.stringify({
        name: offer.id,
        type: "provider",
        ids: {
          uuid: ethers
            .id(offer.id)
            .slice(0, 40 + 2)
            .toLowerCase(),
        },
      }),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let onConnectToUtuClick = async () => {
    let authDataResponse = await addressSignatureVerification();

    if (authDataResponse) {
      setHasToken(true);
    }

    for (let i = 0; i < OFFERS.length; i++) {
      await initEntity(authDataResponse, OFFERS[i]);
    }

    triggerUtuIdentityDataSDKEvent(authDataResponse);
  }

  return (
    <div className="relative z-8 min-w-xl mt-10 mr-50 h-[60vh] flex flex-col justify-center items-center">
     
     
        
    <article
className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
<div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
 
<div className="container mx-auto">

     
      <h2 className="text-2xl font-bold mb-4">Leave a review for the Doctors</h2>
      <div>
        <button
          type='button'
          className="x-utu-btn x-utu-btn-light border-radius cursor-pointer"
          onClick={onConnectToWalletClick}
        >
          Connect to Wallet
        </button>
      </div>
      <div className="pt-4">
        <button
          type='button'
          className="x-utu-btn x-utu-btn-light border-radius cursor-pointer"
          onClick={onConnectToUtuClick}
        >
          Connect to UTU
        </button>
      </div>
      <div className="pt-4">
        (3) Give or Show Feedback
      </div>
      {
        hasToken ? <Offers offers={OFFERS} /> :
          <div className="pt-4">
            Nothing to show until you perform Step 2
          </div>
      }
      
    </div>
    </div>
</article>
</div>
  )
}

export default Utu;
