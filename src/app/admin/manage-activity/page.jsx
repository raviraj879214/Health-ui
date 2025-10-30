
import {ManageActivity} from "../../../components/manageactivity/ManageActivies";



export const metadata = {
  title: "Manage Activity | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};


export default function Page(){


    return(<>
        

        <ManageActivity></ManageActivity>
    
    </>);
}