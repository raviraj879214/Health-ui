"use client"
import ComponentCard from "../common/ComponentCard";
import { ListOfPurchasedPackages } from "./ListofPurchasedPackage";


export function ClinetPurchasedPackages() {


    return (<>


        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={true}>

                    <ListOfPurchasedPackages></ListOfPurchasedPackages>
                    
                </ComponentCard>
            </div>
        </div>




    </>);
}