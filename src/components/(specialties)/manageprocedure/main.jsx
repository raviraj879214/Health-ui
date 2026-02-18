"use client"

import { usePermissions } from "@/context/PermissionContext";
import {CreateSpecialty} from "../manageprocedure/createSpecialty";


// async function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

//   await delay(30000);


export async function Main(){
   


    const { canRead, canCreate, canUpdate, canDelete ,status } = usePermissions("Manage Specialty");



    return(<>
    

        <CreateSpecialty />
        

    </>);
}