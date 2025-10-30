"use client"
import { useForm } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import { useEffect, useState } from "react";
import Label from "../form/Label";
import { ChevronDownIcon } from "@/icons";
import {ListOfCategories} from "../managecategory/List";
import { toast } from "react-toastify";
import {DropDownSearchesCategory} from "../managecategory/DropDownCategory";




export function CreateCategory() {
    const { register, setValue, getValues, formState: { errors }, handleSubmit, reset } = useForm();
    const [categoryid, setcategoryid] = useState(0);
    const [options, setoptions] = useState([]);
    const [authtoken, setauthtoken] = useState("");
    const [triggertable, settriggertable] = useState(null);



    const onCreate =async (data) => {

        debugger;

    const tokenResponse = await fetch("/api/auth/get-token");
      const { token } = await tokenResponse.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/create-category`,{
            method : "POST",
             headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body : JSON.stringify({
            "name" : data.name,
            "parent_category_id" : data.selectcategoryid
          })
        });

        if(res.ok){
            const data = await res.json();


             if (data.status == 409) {
                    setValue ("name","");
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                });

                return;
                }


            toast.success(data.message, {
                      position: "bottom-right",
                      autoClose: 3000,
                    });

                reset();

             settriggertable(data.data.created_at);

        }

    }

    const onUpdate = async (data) => {

         const resToken = await fetch("/api/auth/get-token");
        const { token } = await resToken.json();


         const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/update-category`,{
            method : "PUT",
             headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body : JSON.stringify({
            "name" : data.name,
            "parent_category_id" : data.selectcategoryid,
             "id" : categoryid
          })
        });

        if(res.ok){
            const data = await res.json();


             if (data.status == 409)
                 {
                    setValue ("name","");
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                });

                return;
             }


            toast.success(data.message, {
                      position: "bottom-right",
                      autoClose: 3000,
                    });

            reset();

             setcategoryid(0);
             settriggertable(data.data.updated_at);
        }

    }



    useEffect(() => {
        const fetchtoken = async () => {
            const resToken = await fetch("/api/auth/get-token");
            const { token } = await resToken.json();
            setauthtoken(token.token);
        }
        fetchtoken();
        getCategory();

    }, [triggertable]);


    const getCategory = async () => {

        const resToken = await fetch("/api/auth/get-token");
        const { token } = await resToken.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/get-category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        if (res.ok) {
            const data = await res.json();
            const optionsd = data.data.map((item) => ({
                value: item.id,
                label: item.name,
                level: item.level
            }));
            setoptions(optionsd);
        }
    }


    const handleChildEditData= (id, name , action,parent_category_id)=>{
        debugger;
        if(action == "delete"){

               settriggertable(new Date().toISOString());
               setcategoryid(0);
              reset();
            return;
        }

       
        setcategoryid(id);
        setValue("name",name);
        setValue("selectcategoryid",parent_category_id);
        
    }



    return (<>

        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">

                <ComponentCard title="Manage Category" desc="" showReload={true} infoText={`Hierarchy guide:
• No prefix (black) → Main Category
• └── (blue) → Subcategory (Level 2)
• │ └── (green) → Nested Subcategory (Level 3)
• │ │ └── (orange) → Level 4 Subcategory
• │ │ │ └── (red) → Level 5 Subcategory`}>

                    <form onSubmit={handleSubmit(categoryid > 0 ? onUpdate : onCreate)}>
                        <div className="grid grid-cols-12 gap-6">


                            <div className="col-span-12 sm:col-span-6">
                                <Label>Main Category</Label>

                               
                                <div className="flex items-center gap-2">
                                   
                                    <div className="relative flex-1">

                                        {/* <select
                                            {...register("selectcategoryid")}
                                            className={`w-full rounded-md border px-3 py-2 appearance-none focus:outline-none ${errors.typeid
                                                ? "border-red-500 focus:ring-red-300"
                                                : "border-gray-300 focus:ring-brand-200"
                                                }`}> */}
                                            {/* <option value="">Select an category</option> */}
                                           {/* {options.map((opt) => {
                                                const prefix = opt.level > 1 ? "│   ".repeat(opt.level - 2) + "└── " : "";
                                                const colors = [
                                                    "#000000", // level 1
                                                    "#1E88E5", // level 2
                                                    "#43A047", // level 3
                                                    "#FB8C00", // level 4
                                                    "#E53935", // level 5
                                                ];
                                                const color = colors[opt.level - 1] || "#757575";

                                                    return (
                                                        <option
                                                        key={opt.value}
                                                        value={opt.value}
                                                        style={{
                                                            color,
                                                            paddingLeft: `${opt.level * 10}px`,
                                                            fontWeight: opt.level === 1 ? "bold" : "normal",
                                                        }}
                                                        >
                                                        {prefix}
                                                        {opt.label}
                                                        </option>
                                                    );
                                                    })}


                                        </select>
                                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                            <ChevronDownIcon />
                                        </span> */}

                                        <input className="hidden" type="text" {...register("selectcategoryid")}></input>

                                         <DropDownSearchesCategory
                                          trigger= {triggertable}
                                          value={getValues("selectcategoryid")}
                                         onChange={(val) => {setValue("selectcategoryid",val ? val.code : "")}}></DropDownSearchesCategory>

                                    </div>

                                     
                                   

                                </div>
                                {/* {errors.selectcategoryid && (
                                    <p className="text-red-500 text-sm mt-1">{errors.selectcategoryid.message}</p>
                                )} */}
                            </div>

                            <div className="col-span-12 sm:col-span-6">
                                <Label>Category Name</Label>
                                <input
                                    type="text"
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                     ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}

                                    {...register("name", {
                                        required: "Please enter category name",
                                    })}

                                    placeholder="Enter category name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>


                             <div className="col-span-10"></div> 

                            <div className="col-span-2 ">
                                
                                <button
                                    type="submit"
                                    className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors">
                                    
                                    {categoryid > 0 ? "Update" : "Add"}
                                </button>
                            </div>
                            
                        </div>


                    </form>


                </ComponentCard>
            </div>
        </div>

        <ListOfCategories trigger ={triggertable} sendData={handleChildEditData}></ListOfCategories>



    </>);
}