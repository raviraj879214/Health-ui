import { AboutUs } from "../../components-front-end/contentmanagement/Aboutus/aboutUs";




export const metadata = {
  title: "About Us | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){


    return(<>
    
    
      <AboutUs />
    </>);
}