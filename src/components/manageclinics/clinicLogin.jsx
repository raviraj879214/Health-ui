"use client"

import { clinicLogoutByAdmin } from "@/components-clinic/utils/clinicLogoutByAdmin";
import Switch from "../form/switch/Switch";
import Cookies from "js-cookie";





export function ClinicLogin({id , onData}){


    const onClinicLogin =async (id,checked)=>{
        debugger;
        if (checked) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/clinic-login-by-admin/${id}`, {
                method: "Get",
            });

            if (res.ok) {

                const result = await res.json();
                Cookies.set("clinic_access", result.access_token, {
                    expires: 1,

                    sameSite: "lax",
                });
                Cookies.set("clinic_id", result.user.uuid, {
                    expires: 1,

                    sameSite: "lax",
                });
                Cookies.set("clinic_refresh", result.refresh_token, {
                    expires: 7,

                    sameSite: "lax",
                });
                Cookies.set("clinic_user_uuid", result.user.uuid, {
                    expires: 7,
                    sameSite: "lax",
                });

                Cookies.set("admin_login_clinic", true, {
                    expires: 7,
                    sameSite: "lax",
                });

                
                onData(checked);
            }
        }
        else {

            clinicLogoutByAdmin();
            onData(checked);
        }
       
    }


    return(<>
     <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white">


            <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">
                    Edit Clinic Information
                </span>
                <span className="text-xs text-gray-500">
                    To update details, switch to the clinic dashboard using the toggle.
                </span>
            </div>

            {/* Toggle */}
            <Switch
                    defaultChecked={false}
                 onChange={(checked) =>{
                    onClinicLogin(id,checked);
                 }}

            />

        </div>
    
        
    </>);
}