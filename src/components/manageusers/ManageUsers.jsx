"use client"
import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useForm } from "react-hook-form";
import Select from "../form/Select";
import { ChevronDownIcon } from "@/icons";
import {UserdList} from "../../components/manageusers/UserLists";
import { toast } from "react-toastify";





export function ManageUser() {

    const { register, getValues, setValue, formState: { errors }, reset, handleSubmit } = useForm();
    const [message,setmessage] = useState("");
    const [userbutton,setuserbutton] = useState("");
    const [roleid,setRoleid] = useState(0);


    const [userid,setUserID] = useState(0);





    const onCreate =async (data) => {
        
        setuserbutton(true);
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/users`,{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : data.email,
                password : data.password,
                roleId :  data.roleid,
                firstname : data.firstname,
                lastname : data.lastname,
                Bio : data.bio,
                whatsappNumber: data.whatsappnumber,
                telegramNumber: data.telegramusername,
                messengerID: data.messengerid

            })
        });
        if(res.ok){
            const result =await res.json();
            // setmessage(result.message);

          
             toast.success(result.message, {position: "bottom-right",autoClose: 3000,});

            
            if(result.status == 409){
                setValue("email","");
            }
            else{
                reset();
            }
            setTimeout(() => {
                setmessage("");
            }, 3000);
        }
        setuserbutton(false);
    }

    const onUpdate = async(data)=>{
       
        setuserbutton(true);
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/users/${userid}`,{
            method : "PATCH",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : data.email,
                password : data.password,
                roleId :  data.roleid,
                firstname : data.firstname,
                lastname : data.lastname,
                Bio : data.bio,
                whatsappNumber: data.whatsappnumber,
                telegramNumber: data.telegramusername,
                messengerID: data.messengerid

            })
        });
        if(res.ok){
            const result =await res.json();
            // setmessage(result.message);

          
             toast.success(result.message || "User updated successfully", {position: "bottom-right",autoClose: 3000,});

            
            if(result.status == 409){
                setValue("email","");
            }
            else{
                reset();
            }
            setTimeout(() => {
                setmessage("");
            }, 3000);
        }
        setuserbutton(false);
    }


    const [showPassword, setShowPassword] = useState(false);
    const [options,setoptions] = useState([]);


    const handleSelectChange =(value) => {
        console.log("Selected value:", value);
    };


        const fetchRoles = async () => {
            try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/roles`);
            if (res.ok) {
                const data = await res.json();
                    const optionsd = data.roles.map((item) => ({
                            value: item.id,
                            label: item.name,
                        }));

                    setoptions(optionsd);


            } else {
                console.error("Failed to fetch roles");
            }
            } catch (err) {
            console.error("Error fetching roles:", err);
            }
        };

        useEffect(()=>{
            fetchRoles();
        },[]);



        const handleChildData= async (id,name)=>{
            
        }


       

    const handleChildDelete=(data)=>{
    if(data == true){
       setuserbutton(true);

       setTimeout(() => {
          setuserbutton(false);
       }, 1000);

    }
  }

  const handleChildEdit= async(data)=>{
     console.log("Edit user:", data);

     setValue("email",data.email);
     setValue("firstname",data.firstname);
     setValue("lastname",data.lastname);
     setValue("bio",data.Bio);
     setValue("roleid",data.roleId);

     setValue("whatsappnumber",data.whatsappNumber);
     setValue("telegramusername",data.telegramNumber);
     setValue("messengerid",data.messengerID);
    

     setRoleid(data.role.name);
     setUserID(data.id);
  }




    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="" showReload = {true}>
                     <p className="text-green-500 text-sm"> {message}</p>
                    <form onSubmit={handleSubmit(userid >0 ? onUpdate : onCreate)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <Label>Firstname</Label>
                                <input
                                    type="text"
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                        ${errors.firstname ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                    defaultValue={getValues("firstname")}
                                    {...register("firstname", {
                                        required: "Please enter firstname",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/, // only letters and spaces
                                            message: "firstname name should contain only letters"
                                        }
                                    })}
                                    placeholder="Enter firstname"
                                />
                                {errors.firstname && (
                                    <p className="text-red-500 text-sm">{errors.firstname.message}</p>
                                )}




                            </div>
                            <div>
                                <Label>Lastname</Label>
                                <input
                                    type="text"
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                        ${errors.lastname ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                    defaultValue={getValues("lastname")}
                                    {...register("lastname", {
                                        required: "Please enter lastname",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/, // only letters and spaces
                                            message: "lastname name should contain only letters"
                                        }
                                    })}
                                    placeholder="Enter lastname"
                                />
                                {errors.lastname && (
                                    <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                                )}
                            </div>

                            <div>
                                <Label>Email Address</Label>
                                <input
                                    type="text"
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                        ${errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                    defaultValue={getValues("email")}
                                    {...register("email", {
                                        required: "Please enter email",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "email name should contain only letters"
                                        }
                                    })}
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>


                            <div>
                                <Label>Password</Label>
                                <input
                                    type="password"
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${errors.password
                                            ? "border-red-500 focus:ring-red-300"
                                            : "border-gray-300 focus:ring-brand-200"
                                        }`}
                                    defaultValue={getValues("password")}
                                    {...register("password", {
                                        required: "Please enter a password",
                                        pattern: {
                                            value:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:
                                                "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character."
                                        }
                                    })}
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                                {userid > 0 && (
                                    <>
                                        <p className="mt-2 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600">
                                            To update the user details, you must re-enter the password. For security reasons, we cannot retrieve or display the existing password. You may enter either your current password (if you remember it) or set a new password.
                                        </p>
                                    </>
                                )}
                            </div>

                            <div>
                                <Label>Role </Label>
                                <div className="relative">
                                    <select
                                        {...register("roleid", { required: "Please select role" })}
                                        className={`w-full rounded-md border px-3 py-2 appearance-none focus:outline-none
                                        ${errors.roleid ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                        onChange={(e)=> setRoleid(e.target.options[e.target.selectedIndex].text)}
                                    >
                                        <option value="">Select an option</option>
                                        {options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                        ))}
                                    </select>

                                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                        <ChevronDownIcon />
                                    </span>
                                    </div>

                                 {errors.roleid && (
                                    <p className="text-red-500 text-sm">{errors.roleid.message}</p>
                                )}
                            </div>

                            <div>
                                <Label>Bio</Label>
                                <input
                                    type="text"
                                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                    ${errors.bio ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                    defaultValue={getValues("bio")}
                                    {...register("bio", {
                                        required: "Please enter bio",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/, // only letters and spaces
                                            message: "bio name should contain only letters"
                                        }
                                    })}
                                    placeholder="Enter bio"
                                />
                                {errors.bio && (
                                    <p className="text-red-500 text-sm">{errors.bio.message}</p>
                                )}
                            </div>


                            {roleid == "Coordinator" && (
                                 
                                 <>
                                    <div>
                                        <Label>Whats App Number</Label>
                                        <input
                                            type="text"
                                            className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                    ${errors.whatsappnumber ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                            defaultValue={getValues("whatsappnumber")}
                                            {...register("whatsappnumber", {
                                                required: "Please enter whats app number"

                                            })}
                                            placeholder="Enter bio"
                                        />
                                        {errors.whatsappnumber && (
                                            <p className="text-red-500 text-sm">{errors.whatsappnumber.message}</p>
                                        )}
                                    </div>
                                     <div>
                                        <Label>Telegram User ID</Label>
                                        <input
                                            type="text"
                                            className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                    ${errors.telegramusername ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                            defaultValue={getValues("telegramusername")}
                                            {...register("telegramusername", {
                                                required: "Please enter telegram username"

                                            })}
                                            placeholder="Enter telegram username"
                                        />
                                        {errors.telegramusername && (
                                            <p className="text-red-500 text-sm">{errors.telegramusername.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Messenger ID</Label>
                                        <input
                                            type="text"
                                            className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                    ${errors.messengerid ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                            defaultValue={getValues("messengerid")}
                                            {...register("messengerid", {
                                                required: "Please enter messenger id"

                                            })}
                                            placeholder="Enter messenger username"
                                        />
                                        {errors.messengerid && (
                                            <p className="text-red-500 text-sm">{errors.messengerid.message}</p>
                                        )}
                                    </div>
                                 </>
                            )}
                           






                          





                        </div>

                        <div className="grid grid-cols-10 gap-4 mt-5">
                            <div className="col-span-8"></div> 
                            <div className="col-span-2">
                                <button
                                    type="submit"
                                    className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors">

                                    {userid > 0 ? "Update User" : "Create User"}
                                </button>
                            </div>
                        </div>

                    </form>

                </ComponentCard>
            </div>
        </div>

  
        <ComponentCard title="Manage Users List" desc="">

                <UserdList trigger={userbutton} sendDelete={handleChildDelete} sendEdit={handleChildEdit}></UserdList>

        </ComponentCard>



    </>);
}