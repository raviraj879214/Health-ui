"use client";
import { useEffect, useState } from "react";



export function TermsAndCondition(){


    const [content,setContent] = useState("");


    useEffect(()=>{

        getCms();


    },[]);

    const getCms = async ()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-cms/Terms`,{
            method : "Get",
             headers :{
          "Content-Type" : "application/json"
        }
        });
        if(res.ok){

            const result= await res.json();
            console.log("result.data.content",result.data.content);
            setContent(result.data.content);
        }
    } 
    return(<>
    
        
            <div dangerouslySetInnerHTML={{ __html: content }} />

    </>);
}