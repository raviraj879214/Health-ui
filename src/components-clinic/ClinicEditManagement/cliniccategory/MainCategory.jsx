import ComponentCard from "@/components/common/ComponentCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {ClinicSpecializations} from "../cliniccategory/ClinicSpecialization";
import {ClinicSpeciality} from "../cliniccategory/ClinicSpecialty";
import {ClinicTreatment} from "../cliniccategory/ClinicTreatments";


export function MaincategoryBoard({clinicuuid}){


    return(<>
        <ComponentCard title="Manage Specialization Specialty Treatment">
             <Tabs>
             
              <TabList className="flex border-b border-gray-300 mb-4">
                <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                  Specializations
                </Tab>
                <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                  Specialty
                </Tab>
                  <Tab className="px-6 py-3 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none selected:text-blue-600 selected:border-b-2 selected:border-blue-600 font-medium">
                   Treatment
                </Tab>
              </TabList>
            
            
              <TabPanel>
                  <ClinicSpecializations clinicuuid={clinicuuid}></ClinicSpecializations>
              </TabPanel>
              <TabPanel>
                  <ClinicSpeciality clinicuuid={clinicuuid}></ClinicSpeciality>
              </TabPanel>
                <TabPanel>
                <ClinicTreatment clinicuuid={clinicuuid}></ClinicTreatment>
              </TabPanel>
               

         </Tabs>
            

        </ComponentCard>
    </>);
}