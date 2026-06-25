import PackageListing from "../../components-front-end/allpackages/allPackages";



export const metadata = {
  title: "Treatment Packages | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){



    return(<>
    
        <PackageListing />
    </>);
}