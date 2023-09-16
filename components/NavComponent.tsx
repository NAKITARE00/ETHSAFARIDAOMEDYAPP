/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import useOnClickOutside from "./useOnClickOutside";
import { ConnectButton } from '@rainbow-me/rainbowkit';


const navData = [
  {
    name: "Explore",
    href: "#",
  },
  {
    name: "Activity",
    href: "/MyProfile",
  },
  {
    name: "Resources",
    href: "#about",
  },
];

export default function NavComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  useOnClickOutside(ref, () => setModalOpen(false));

  return (
    <div className="sticky mb-20 z-10 backdrop-blur-xl  text-xl font-bold drop-shadow-xl flex-none transition-colors duration-500  ">
      <div className="flex justify-between items-center sm:px-8 px-2 py-6 sm:justify-between sm:space-x-10">
        <div className="flex justify-start">
        <img src="AFYAPP-ICON.png" width="65" height="65" />
        </div>

        <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />
    </div>

      </div>
    </div>
  );
}



