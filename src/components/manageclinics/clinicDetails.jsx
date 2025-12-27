"use client"
import { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TextArea from "@/components/form/input/TextArea";
import {BannerSlider} from "../manageclinics/components/BannerSlider";
import {DoctorList} from "../manageclinics/components/doctorList";
import { adminHeaders } from "../utils/adminHeader";
import {SurgeryImages} from "../manageclinics/components/surgeryImages";
import {ClinicDescription} from "../manageclinics/components/clinicDescription";
import {ClinicSpecialty} from "../manageclinics/components/clinicSpecialty";
import Label from "../form/Label";
import {ClinicSubSpecialty} from "../manageclinics/components/clinicSubSpecialty";
import {ClinicTreatment} from "../manageclinics/components/clinicTreatment";
import {PackageClinicList} from "../manageclinics/components/packageClinicList";

export function ClinicDetails({id}){

   



      


    return(<>
    
      <ComponentCard title="Clinic Details">
          <div className="grid grid-cols-6 grid-rows-2 gap-2">
              <div className=" p-2 row-span-2 col-start-6">
                  <p className="p-2 border border-green-500 rounded text-center bg-green-100 text-green-800 font-medium">
                      Approved
                  </p>
              </div>
          </div>

            <div className="grid grid-cols-2 gap-2">
                
                <BannerSlider id={id}></BannerSlider>
                <div className="p-1 flex justify-center">
                    <div className="max-w-md w-full border border-gray-200 rounded-xl shadow-sm bg-white p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Aalpha Info Server Pvt Ltd
                        </h3>

                        <div className="space-y-3 text-sm text-gray-600">
                            <p className="flex">
                                <span className="font-medium w-24">Address:</span>
                                <span>
                                    No. 197, 2nd Floor, 5th Main, 6th Cross, Gandhinagar,
                                    Bangalore - 560009, Karnataka, India
                                </span>
                            </p>

                            <p className="flex">
                                <span className="font-medium w-24">Phone:</span>
                                <span>+91-836-4262222</span>
                            </p>

                            <p className="flex">
                                <span className="font-medium w-24">Email:</span>
                                <span>email@gmail.com</span>
                            </p>

                            <p className="flex">
                                <span className="font-medium w-24">Registered:</span>
                                <span>04-12-2025</span>
                            </p>
                        </div>


                        <div className="flex items-center gap-3 mt-3 text-body">

                        
                        <a href="tel:+919876543210" className="hover:text-heading">
                          <img width={"30px"} src="http://localhost:3000/images/brand/phone.svg" alt="WhatsApp" />
                        </a>

                    
                        <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          className="hover:text-heading"
                        >
                        <img width={"30px"} src="http://localhost:3000/images/brand/whatsapp.svg" alt="WhatsApp" />


                        </a>

                    
                        <a
                          href="https://t.me/clinic_support"
                          target="_blank"
                          className="hover:text-heading"
                        >
                          <img width={"30px"} src="http://localhost:3000/images/brand/telegram.svg" alt="WhatsApp" />
                        </a>

                      
                      

                      </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-col-1">
                <DoctorList id={id}/>
            </div>

            <div className="grid grid-col-1">
                    <PackageClinicList id={id} />
            </div>
           
            <div className="grid grid-col-1">
               <SurgeryImages id={id}></SurgeryImages>
            </div>

            <div className="grid grid-col-1">
                   <ClinicSpecialty id={id} />

            </div>

              <div className="grid grid-col-1">
                    <ClinicSubSpecialty id={id}></ClinicSubSpecialty>

            </div>
              <div className="grid grid-col-1">
                   <ClinicTreatment id={id}></ClinicTreatment>

            </div>



            <div className="grid grid-col-1">

                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Hospital Accreditation & Certification
                        </h3>
                        <div className="flex items-center gap-x-1">

                        </div>
                    </div>
                    <div className="p-4 md:p-5 overflow-y-auto max-h-80">

                        <ul className=" divide-y divide-default">
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">art of a recognized hospital network; listed among NABH‑accredited providers.</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>

                           
                        </ul>


                    </div>
                </div>


            </div>

            <div className="grid grid-col-1">

                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Hospital License
                        </h3>
                        <div className="flex items-center gap-x-1">

                        </div>
                    </div>
                    <div className="p-4 md:p-5">
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            With supporting text below as a natural lead-in to additional content.
                            
                        </p>
                        
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 gap-4 ">
               <ClinicDescription id={id}></ClinicDescription>
            </div>

            <div className="grid grid-cols-1 gap-4 ">
                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                           Make Action
                        </h3>
                    </div>
                    <div className="p-4 md:p-5">
                        <div className="h-80 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                            <Tabs>
                                   
                                    <TabList className="flex border-b border-gray-300 mb-4">
                                        <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                                        Block
                                        </Tab>
                                        <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                                        Reject
                                        </Tab>
                                        <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                                        Un-Reject/Block
                                        </Tab>
                                        <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                                        Want to send message
                                        </Tab>
                                    </TabList>


                                    <TabPanel>
                                        <div className="text-gray-700 space-y-2">
                                        <h2 className="text-md font-semibold mb-2">Write Reason for Block</h2>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none h-32"
                                            placeholder="Type your reason here..."
                                        ></textarea>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                            Block
                                        </button>
                                        </div>
                                    </TabPanel>


                                    <TabPanel>
                                    <div className="text-gray-700 space-y-2">
                                        <h2 className="text-md font-semibold mb-2">Write Reason for Rejection</h2>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none h-32"
                                            placeholder="Type your reason here..."
                                        ></textarea>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                            Reject
                                        </button>
                                        </div>
                                    </TabPanel>
                                        <TabPanel>
                                    <div className="text-gray-700 space-y-2">
                                        <h2 className="text-md font-semibold mb-2">Write Reason for Un-Reject/Block</h2>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none h-32"
                                            placeholder="Type your reason here..."
                                        ></textarea>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                            Un-Reject/Block
                                        </button>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                    <div className="text-gray-700 space-y-2">
                                        <h2 className="text-md font-semibold mb-2">Write message to send</h2>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 resize-none h-32"
                                            placeholder="Type your reason here..."
                                        ></textarea>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                            Send
                                        </button>
                                        </div>
                                    </TabPanel>
                            </Tabs>

                        </div>
                    </div>
                </div>
            </div>











        </ComponentCard>

    
    </>);
}