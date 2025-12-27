
import {StripeBoardSuccess} from "../../../components-front-end/stripeonboardingsucces/stripeBoardSuccess";


export default async function Page({params}){

    const {id} = await params;




    return(<>
      
      <StripeBoardSuccess id={id} />
    </>);
}