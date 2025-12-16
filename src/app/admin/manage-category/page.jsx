import {CreateCategory} from "../../../components/managecategory/Create";




export const metadata = {
  title: "Manage Category | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page(){









    return(<>
    
        <CreateCategory></CreateCategory>
      

    
    </>);
}