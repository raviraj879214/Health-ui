"use client";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import Button from "../ui/button/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adminHeaders } from "../utils/adminHeader";
import { toast, ToastContainer } from "react-toastify";





export function AddOnServices({data,patientquerid,additioanpayment,onReturn,additionalserviceslist}){
const [isOpen, setIsOpen] = useState(false);

    const  [services,setServices] = useState([]);


    useEffect(()=>{
       
        if(data){
             setServices(data);
        }
    },[data]);



    const {register,formState:{errors},handleSubmit,reset,setValue,getValues} = useForm();
    const onCreate = async(data)=>{

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/additonal-services/create-service`,{
            method : "Post",
            headers : await adminHeaders(),
            body : JSON.stringify({
                "service" : data.service,
                "description" : data.description,
                "price" : data.price,
                "patientqueryid" : patientquerid
            })
        });
        if(res.ok){
            const result = await res.json();

             setServices(prev=>[
                ...prev,
                result.data
             ]);
             onReturn(result.data);
             toast.success("Service created successfully",{
                position : "bottom-right",
                autoClose : 3000
             });
             reset();
             setIsOpen(false);

        }

      
    }


    return(<>
    
        <div className="bg-white p-6 rounded-2xl shadow-md">
                
            <ToastContainer></ToastContainer>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Additional Services</h2>
                
               {additioanpayment === 0 ? (
                    <Button onClick={() => setIsOpen(true)}>
                        + Add Services
                    </Button>
                ) : (
                    <p className="text-sm text-red-500 font-medium">
                        Payment link already generated. You can add services only once.
                    </p>
                )}
            </div>
            {isOpen && (
                <div className="p-4 border rounded-lg bg-white shadow-md max-w-md relative">

                  
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold">
                        ✕
                    </button>


                    <form onSubmit={handleSubmit(onCreate)}>


                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Select Services (Optional)
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                                onChange={(data)=>{
                                   
                                    const selectedservice = additionalserviceslist.find(x=>x.id === data.target.value);
                                    console.log("select services",selectedservice);

                                    setValue("service",selectedservice.label);
                                    setValue("description",selectedservice.value);
                                    setValue("price",selectedservice.price);

                                }}
                                
                                >
                                <option value="">Select Service</option>
                               
                                {additionalserviceslist.map((item)=>(
                                    <option value={`${item.id}`}>{item.label}</option>
                                ))}
                            </select>
                        </div>



                        <div className="mb-4">



                            <label className="block text-sm font-semibold mb-1">
                                Service Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter service name"
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("service", { required: "Please enter service" })}
                            />
                            {errors.service && (<p className="text-red-400">{errors.service.message}</p>)}
                        </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Enter description"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            {...register("description",{required :"Please enter description"})}
                        />
                        {errors.description &&(<p className="text-red-400">{errors.description.message}</p>)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("price",{required :"Please enter price"})}/>
                        {errors.price &&(<p className="text-red-400">{errors.price.message}</p>)}
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Submit
                    </button>
                    </form>
                </div>
            )}

          



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {services.map((item) => (
                    <div
                        key={item.id}
                        className="p-5 bg-gray-50 rounded-2xl border hover:shadow-lg transition-all duration-300">
          
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-md font-semibold text-gray-800">
                                {item.label}
                            </h3>
                            <span className="text-green-600 font-bold">
                                {brazilianCurrency(item.price)}
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Description</p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

           


        </div>


    </>);
}