"use client"
import { useForm } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import { usePermissions } from "@/context/PermissionContext";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { adminHeaders } from "../utils/adminHeader";
import { PencilIcon, TrashBinIcon } from "@/icons";
import { ButtonSpinner} from "../../reusable/buttonSpinner";
import {useConfirm} from "../../hooks/useConfirm";
import { toast, ToastContainer } from "react-toastify";




export function CreateFaqs(){

        const { register, reset, formState: { errors }, handleSubmit, setValue } = useForm();
        const { canRead, canCreate, canUpdate, canDelete ,status } = usePermissions("Manage Faq");
        const [faqs, setFaqs] = useState([]);
        const [faqbutton,setFaqButton] = useState(false);
        const [faqid,setFaqID] = useState("");
        const {confirm,ConfirmDialog} = useConfirm();




        const create = async(data)=>{
            debugger;
            setFaqButton(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/faq/create-faq`,{
                method : "Post",
                headers : await adminHeaders(),
                body : JSON.stringify({
                    "question" : data.question,
                    "answer" : data.answer
                })
            });

            if(res.ok){
                const result= await res.json();
                setFaqs(prev => [
                ...prev,
                result.data
                ]);
                toast.success("Faq created successfully",{
                    position : "bottom-right",
                    autoClose : 3000
                });
                reset();
                
            }

            setFaqButton(false);
        }


        const update = async(data)=>{
            debugger;
            setFaqButton(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/faq/update-faq`,{
                method : "Post",
                headers : await adminHeaders(),
                body : JSON.stringify({
                    "id" : faqid,
                    "question" : data.question,
                    "answer" : data.answer
                })
            });
            if(res.ok){
                const result= await res.json();
                setFaqs(prev =>
                    prev.map(faq =>
                        faq.id === result.data.id ? result.data : faq
                    )
                );
                setFaqID("");
                reset();
                toast.success("Faq updated successfully",{
                    position : "bottom-right",
                    autoClose : 3000
                });
            }

            setFaqButton(false);
        }







  useEffect(()=>{
    fetchFaqs();
  },[]);

  const fetchFaqs = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/faq/get-all`,{
        method : "Get",
        headers : await adminHeaders(),

    });
    if(res.ok){
        debugger;
        const result= await res.json();
        setFaqs(result.data);
    }
  }






    const handleEnd =async () => {
        const updatedOrder = faqs.map((item, index) => ({
            id: item.id,
            position: index + 1
        }));
        console.log(updatedOrder);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/faq/update-position`,{
            method : "Put",
            headers : await adminHeaders(),
            body : JSON.stringify({
               postions : updatedOrder
            })
        });
        if(res.ok){
            const result= await res.json();
            

        }
    };







    const onEdit = async (data) => {
        setValue("question", data.question);
        setValue("answer", data.answer);
    }

    const onDelete = async (data) => {
        debugger;
        const result = await confirm("are you sure to delete this item");
        if (!result) {
            return false;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/faq/delete-faq/${data.id}`, {
            method: "Delete",
            headers: await adminHeaders(),
        });
        if (res.ok) {
            const result = await res.json();
            console.log("result.data", result.data);
            setFaqs(result.data !== null ? result.data : []);
            toast.success("Faq deleted successfully", {
                position: "bottom-right",
                autoClose: 3000
            });
        }
    }







    return(<>
            <ConfirmDialog></ConfirmDialog>
            <ToastContainer></ToastContainer>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="Create Faq's" desc="" showReload={true}>
                    <form onSubmit={handleSubmit(faqid !=="" ? update : create)}>

                        <div className="grid grid-cols-6 gap-4 mt-3">


                            {/* Meta Keywords */}
                            <div className="col-span-6 md:col-span-6">
                                <label className="block mb-1 text-sm font-medium">Faq Question</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    {...register("question", { required: "Please enter question" })}
                                />
                                {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
                            </div>


                            {/* Meta Description */}
                            <div className="col-span-6">
                                <label className="block mb-1 text-sm font-medium">Faq Answer</label>
                                <textarea
                                    placeholder=""
                                    className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    rows={4}
                                    {...register("answer", { required: "Please enter meta description" })}

                                />
                                {errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>}
                            </div>

                        </div>

                        <div className="grid grid-cols-10 gap-4 mt-5">
                            <div className="col-span-8"></div> {/* spacer */}

                            <div className="col-span-2" >
                                <div className="w-full px-2.5 mt-1">
                                    <button
                                     disabled={faqbutton}
                                        type="submit"
                                        className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors">

                                        {faqid !== "" ? (<>{faqbutton ? <ButtonSpinner></ButtonSpinner> : "Update"}</>):(<>{faqbutton ? <ButtonSpinner></ButtonSpinner> : "Create"}</>)}


                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>


                </ComponentCard>
            </div>
        </div>








        <div className="grid grid-cols-12 gap-4 mt-5">
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="Manage Faq's" desc="you can make re-arrangemnt of postion by drag & drop" showReload={true}>

                    <Table>

                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>

                                <TableCell className="px-5 py-3 font-medium text-gray-500">
                                    Name
                                </TableCell>

                                <TableCell className="px-5 py-3 font-medium text-gray-500">
                                    Answer
                                </TableCell>
                                <TableCell className="px-5 py-3 font-medium text-gray-500">
                                    Action
                                </TableCell>

                            </TableRow>
                        </TableHeader>


                        <ReactSortable
                            tag="tbody"
                            list={faqs}
                            setList={setFaqs}
                            animation={200}
                            onEnd={handleEnd}
                            className="divide-y divide-gray-100 dark:divide-white/[0.05]"
                        >

                            {faqs.map((faq) => (
                                <TableRow key={faq.id} className="cursor-move">

                                   
                                    <TableCell className="px-5 py-4 whitespace-normal break-words">
                                        <span className="text-gray-800 font-medium">
                                            {faq.question}
                                        </span>
                                    </TableCell>

                                   
                                    <TableCell className="px-5 py-4 whitespace-normal break-words">
                                        <span className="text-gray-600">
                                            {faq.answer}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-5 py-4">
                                        
                                        <div className="flex gap-3">

                                          
                                            {canUpdate ? (
                                                <button onClick={()=> {
                                                    setFaqID(faq.id);
                                                    onEdit(faq);
                                                }}>
                                                    <PencilIcon />
                                                </button>
                                            ) : (
                                                <button disabled className="opacity-40 cursor-not-allowed">
                                                    <PencilIcon />
                                                </button>
                                            )}
                                                /
                                           
                                            {canDelete ? (
                                                <button
                                                onClick={()=>{
                                                    onDelete(faq);
                                                }}>

                                                    <TrashBinIcon />
                                                </button>
                                            ) : (
                                                <button disabled className="opacity-40 cursor-not-allowed">
                                                    <TrashBinIcon />
                                                </button>
                                            )}


                                        </div>

                                    </TableCell>



                                </TableRow>
                            ))}

                        </ReactSortable>

                    </Table>

                </ComponentCard>
            </div>
        </div>






    
    
    </>)
}