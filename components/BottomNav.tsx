import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";



export default function BottomNav() {
  const { theme, setTheme } = useTheme();
  const NewTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  console.log(theme);
  return (
    //@ts-ignore
    
    <center>
   
      <div className=" fixed fill-[#1F2937] dark:fill-white bottom-5 w-full  ">
        <div className=" shadow-2xl flex justify-center items-center backdrop-blur-sm bg-white/30 border-[#F3F4F6]   dark:border-[#374151] border  rounded-xl max-w-[24rem] py-3 px-5">
          <Link href="/">
            <div className=" bg-gray-100 dark:bg-[#1F2937] w-[60px] h-[60px] flex justify-center items-center mx-2 rounded-xl cursor-pointer hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6] ">
            <img src="Home.png" width="35" height="33" />
            </div>
          </Link>
          <Link href="/MyProfile">
            <div className=" bg-gray-100 dark:bg-[#1F2937]  w-[60px] h-[60px] flex justify-center items-center mx-2 rounded-xl cursor-pointer hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6]   ">
              <img src="Profile.png" width="32" height="32" />
            </div>
          </Link>
          <Link href="/Records">
            <div className=" bg-gray-100 dark:bg-[#1F2937] l w-[60px] h-[60px] flex justify-center items-center mx-2 rounded-xl cursor-pointer hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6] ">
              <img src="Records.png" width="35" height="35" />
            </div>
          </Link>

          <Link href="/MedicalExperts">
            <div className=" bg-gray-100 dark:bg-[#1F2937]  w-[60px] h-[60px] flex justify-center items-center mx-2 rounded-xl cursor-pointer hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6]   ">
            <img src="Experts.png" width="35" height="35" />
            
            </div>
          </Link>
          
          <Link href="/PatientManagement">
            <div className=" bg-gray-100 dark:bg-[#1F2937]  w-[60px] h-[60px] flex justify-center items-center mx-2 rounded-xl cursor-pointer hover:bg-[#3B82F6] dark:hover:bg-[#3B82F6]   ">
              <img src="PatientManagement.png" width="32" height="32" />
            </div>
          </Link>
          
         
        </div>
      </div>
     
      {/* @ts-ignore */}
    </center>
   
  );
}