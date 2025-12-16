
"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Phone, Mail, Globe, MessageCircle, Send, Router } from "lucide-react";
import { useRouter } from "next/navigation";




// export const metadata = {
//   title: "Manage Clinics | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
// };





export default function Page(){


  const router = useRouter();

    return(<>

        <PageBreadcrumb pageTitle="Manage Clinics" />
        <ComponentCard>
            <div>
             <ul className="divide-y divide-default">

             
              <li className="py-4">
                <div className="flex items-center justify-between">

                  {/* Left */}
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="/images/clinics/clinic-1.jpg"
                      alt="Clinic"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-heading truncate">
                        Apollo Clinic
                      </p>

                      <p className="text-xs text-body truncate">
                        #45 MG Road, Bengaluru, Karnataka
                      </p>

                      <div className="flex items-center gap-3 mt-1 text-body">

                        
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

                    <div class="flex -space-x-4 rtl:space-x-reverse">
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />

                     <a class="flex items-center justify-center w-10 h-10 text-xs font-medium bg-[#000] text-white border-2 border-buffer rounded-full" href="#">
                        +99
                      </a>

                  </div>

                    
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-semibold text-heading bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium px-3 py-1.5 rounded-base">
                      View
                    </button>

                    <button className="text-xs font-semibold text-body bg-transparent border border-default-medium hover:bg-neutral-secondary-medium px-3 py-1.5 rounded-base">
                      Edit
                    </button>
                  </div>
                </div>
              </li>

             
              <li className="py-4">
                <div className="flex items-center justify-between">

                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/images/clinics/clinic-2.jpg"
                      alt="Clinic"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-heading truncate">
                        Fortis Health Center
                      </p>

                      <p className="text-xs text-body truncate">
                        8th Block, Koramangala, Bengaluru
                      </p>

                      <div className="flex items-center gap-3 mt-1 text-body">

                        
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

                  <div class="flex -space-x-4 rtl:space-x-reverse">
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <img class="w-10 h-10 border-2 border-buffer rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />

                     <a class="flex items-center justify-center w-10 h-10 text-xs font-medium bg-[#000] text-white border-2 border-buffer rounded-full" href="#">
                        +99
                      </a>

                  </div>


                  <div className="flex items-center gap-2">
                        

                    <button
                      onClick={()=> router.push("/admin/clinic-details")}
                    className="text-xs font-semibold text-heading bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium px-3 py-1.5 rounded-base">
                      View
                    </button>

                    <button className="text-xs font-semibold text-body bg-transparent border border-default-medium hover:bg-neutral-secondary-medium px-3 py-1.5 rounded-base">
                      Edit
                    </button>

                    
                  </div>

                </div>
              </li>

            </ul>
          </div>




        </ComponentCard>
                
           


    
    </>);
}