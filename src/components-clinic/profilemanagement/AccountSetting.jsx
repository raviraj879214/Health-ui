

import {ClinicProfile} from "../profilemanagement/Profile";
import {ChangeCredentials} from "../profilemanagement/ChnagePassword";

export  function  Account(){



    return(<>
    <div className="w-full flex flex-col md:flex-row gap-6">
        <ClinicProfile></ClinicProfile>
        <ChangeCredentials></ChangeCredentials>
    </div>
    </>);
}