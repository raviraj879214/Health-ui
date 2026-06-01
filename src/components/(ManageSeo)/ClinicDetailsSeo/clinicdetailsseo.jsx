"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";





export function ClinicDetailsSeo(){

    const [cliniclist,setClinicList] = useState([]);
    const [selectedclinic,setSelectedClinic] = useState(null);
     const { register, reset, formState: { errors }, handleSubmit, setValue ,getValues } = useForm();

     const [sugexample,setSlugExample] = useState("");


    useEffect(() => {
            fetchClinicList();
    }, []);

    const fetchClinicList = async()=>{

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-details/get-clinic-list`,{
            method : "Get",
            headers : await adminHeaders(),
        });
        if(res.ok){
            const result= await res.json();
            setClinicList(result.data);
        }
    }


    const selcectClinic =async(data)=>{
        debugger;
        const getClinic = cliniclist.find(x=>x.id == data);
        setSelectedClinic(getClinic);

     
            setValue("metaTitle",getClinic.metatitle);
            setValue("metaKeywords",getClinic.metakeyword);
            setValue("metaDescription",getClinic.metadescription);
            setValue("slug",getClinic.slug);
            setSlugExample(getClinic.slug);
        
    }

    const onUpdateSeo = async (data) => {



        const payload = {
            metatitle: data.metaTitle,
            metakeywords: data.metaKeywords,
            metadescription: data.metaDescription,
            slug: `${data.slug}-${selectedclinic?.uuid}`,
            uuid: selectedclinic.uuid
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-details/update-seo-clinic-details`,{
            method : "Put",
            headers : await adminHeaders(),
            body : JSON.stringify(payload)
        });
        if(res.ok){
            const result= await res.json();
            reset();
            setSlugExample("");
            setSelectedClinic(null);
            toast.success("Seo updated clinic successfully",{
                position : "bottom-right",
                autoClose : 3000
            });

        }
       
    }


    return(<>
    
        <ToastContainer></ToastContainer>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={true}>
                    <div className="w-full max-w-md">
                        <label
                            htmlFor="specialization"
                            className="block mb-2 text-sm font-medium text-gray-700">
                            Select Clinic
                        </label>

                        <select
                            id="specialization"
                            name="specialization"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e)=>{
                                selcectClinic(e.target.value);
                            }}
                        >
                            <option value="">Select Clinic</option>
                            {cliniclist.map((item) => (
                                <option value={`${item.id}`}>{item.name}</option>
                            ))}

                        </select>
                    </div>
                    {selectedclinic != null && (<>
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-xl font-semibold mb-6">Clinic Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                <div>
                                    <p className="text-sm text-gray-500">Clinic Name</p>
                                    <p className="font-medium text-gray-900">{selectedclinic.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Specialty</p>
                                    <p className="font-medium text-gray-900">
                                        {selectedclinic?.clinics
                                            ?.filter((item) => item.specialization)
                                            ?.map((item) => item.specialization.name)
                                            ?.join(", ")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Sub Specialty</p>
                                    <p className="font-medium text-gray-900">
                                        {selectedclinic?.clinicsSpecialty
                                            ?.filter((item) => item.specialty)
                                            ?.map((item) => item.specialty.name)
                                            ?.join(", ")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Treatment</p>
                                    <p className="font-medium text-gray-900">
                                        {selectedclinic?.clinicTreatments
                                            ?.filter((item) => item.treatment)
                                            ?.map((item) => item.treatment.name)
                                            ?.join(", ")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium text-gray-900">
                                        {[
                                            selectedclinic?.street,
                                            selectedclinic?.neighborhood,
                                            selectedclinic?.citycep,
                                            selectedclinic?.estado,
                                            selectedclinic?.cep,
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "N/A"}
                                    </p>
                                </div>



                            </div>
                        </div>
                    </>)}
            
                </ComponentCard>

            </div>

            {selectedclinic != null && (<>
                <div className="col-span-12 sm:col-span-12">
                    <ComponentCard title="Seo Content">

                        <form onSubmit={handleSubmit(onUpdateSeo)}>

                            <div className="grid grid-cols-6 gap-4 mt-3">

                                {/* Meta Title */}
                                <div className="col-span-6 md:col-span-3">
                                    <label className="block mb-1 text-sm font-medium">Meta Title</label>
                                    <input
                                        type="text"
                                        placeholder="Cooking Pasta Tips"
                                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        {...register("metaTitle", {
                                            required: "Please enter meta title",
                                            maxLength: {
                                                value: 60,
                                                message: "Meta title cannot exceed 60 characters",
                                            },
                                        })}
                                    />
                                    {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle.message}</p>}
                                </div>

                                {/* Meta Keywords */}
                                <div className="col-span-6 md:col-span-3">
                                    <label className="block mb-1 text-sm font-medium">Meta Keywords</label>
                                    <input
                                        type="text"
                                        placeholder="blog, cooking, pasta, recipes"
                                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        {...register("metaKeywords", { required: "Please enter meta keywords" })}
                                    />
                                    {errors.metaKeywords && <p className="text-red-500 text-sm">{errors.metaKeywords.message}</p>}
                                </div>



                                {/* Meta Description */}
                                <div className="col-span-6">
                                    <label className="block mb-1 text-sm font-medium">Meta Description</label>
                                    <textarea
                                        placeholder="Learn how to cook perfect pasta every time"
                                        className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        rows={4}
                                        {...register("metaDescription", {
                                            required: "Please enter meta description",
                                            maxLength: {
                                                value: 150,
                                                message: "Meta Description cannot exceed 150 characters",
                                            },
                                        })}

                                    />
                                    {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription.message}</p>}
                                </div>


                                <div className="col-span-6 md:col-span-3">
                                    <label className="block mb-1 text-sm font-medium">Slug</label>

                                    <input
                                        type="text"
                                        placeholder="how-to-cook-pasta"
                                        className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200"
                                        {...register("slug", {
                                            required: "Please enter slug",
                                            onChange: (e) => {
                                                const slug = e.target.value
                                                    .toLowerCase()
                                                    .trim()
                                                    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
                                                    .replace(/\s+/g, "-") // spaces -> hyphens
                                                    .replace(/-+/g, "-"); // remove duplicate hyphens

                                                setValue("slug", slug);
                                                setSlugExample(slug);
                                            },
                                        })}
                                    />

                                    {errors.slug && (
                                        <p className="text-red-500 text-sm">{errors.slug.message}</p>
                                    )}
                                </div>
                                <div className="col-span-6 md:col-span-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Slug URL Preview
                                    </label>

                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Preview
                                        </p>

                                        <p className="mt-2 break-all text-sm text-blue-600 font-medium">
                                            {sugexample
                                                ? `${sugexample}-${selectedclinic?.uuid}`
                                                : "https://yourdomain.com/example-slug"}
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className="grid grid-cols-10 gap-4 mt-5">
                                <div className="col-span-8"></div> {/* spacer */}

                                <div className="col-span-2" >

                                    <button
                                        type="submit"
                                        className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                                    >
                                        Update
                                    </button>

                                </div>

                            </div>


                        </form>



                    </ComponentCard>
                </div>
            </>)}

                                               
        </div>

    </>);
}