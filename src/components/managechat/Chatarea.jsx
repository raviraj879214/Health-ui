"use client";
import { useState } from "react";
import {ChatUserList} from "../managechat/ChatUser";
import {MessagesBox} from "../managechat/Messages";
export function ChatLayout() {

    const [selecteduserid,setselecteduserid]= useState();
    const [clinicsname,setclinicsname] = useState();




    const  selecteduser=(data,clinic_name)=>{

        setselecteduserid(data);
        setclinicsname(clinic_name);

    }



  return (
    <>
      <div className="flex h-screen ">

        
        <div className="w-1/4 bg-white border-r border-gray-300">

          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Chat Web</h1>

            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>

              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                </ul>
              </div>
            </div>
          </header>

            <ChatUserList onSelectUser={selecteduser}></ChatUserList>
        </div>

       
        <div className="flex-1">

          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">{clinicsname}</h1>
          </header>

            <MessagesBox  receiverid={selecteduserid} senderid={1}></MessagesBox>


          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4 ">
            <div className="flex items-center w-1/2">
              <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
            </div>
          </footer>



        </div>
      </div>
    </>
  );
}
