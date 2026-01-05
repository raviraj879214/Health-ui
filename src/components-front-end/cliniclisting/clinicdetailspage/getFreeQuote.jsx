"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";




export function GetFreeQuote({ onClose , packages ,id }){


    const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland",
  "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen","Zambia", "Zimbabwe"];



  const {register,setValue,getValues,handleSubmit,formState:{errors},reset} = useForm();
  const[buttonpost,setButtonPost] = useState(false);
  const[success,setSuccess] = useState(false);
  const[querycode,setQueryCode] = useState("");






  const onRaise = async(data)=>{
    debugger;
    setButtonPost(true);


      let payload = {
          patientName: data.patientname,
          phoneNumber: data.phone,
          message: data.message,
          clinicId: id,
          packageId: data.package,
          email: data.email,
          subject: data.subject,
          telegramUsername: data.telegram,
          whatsappNumber: data.whatsapp,
          city: data.city,
          postalCode: data.zip,
          state: data.state,
          streetAddress: data.streetAddress,
      };

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-listing/raise-post-query`,{
        method : "Post",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify(payload)
    });

    if(res.ok){

        const result =await res.json();

        setQueryCode(result.data.querycode);

        reset();

        setSuccess(true);
        
    }

    setButtonPost(false);
  }






    return(<>
    
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

  <div className="relative z-10 rounded-2xl bg-white p-8 shadow-2xl w-auto h-auto max-w-[90vw] max-h-[90vh] overflow-auto">
    

       

        {success ?(
            <>

<div class="bg-gray-100 ">
      <div class="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Query Posted Successfully!
                </h3>
                <p class="text-gray-600 my-2">
                Our coordinator will contact you soon. Please wait for a while.
                </p>
                <p>
                Have a great day!
                </p>
                <p>
                    Query Code : <b>{querycode}</b>
                </p>

            <div class="py-10 text-center">
                <button onClick={()=>{
                  onClose(false);
                  setSuccess(false);
                }} 
                class="btn btn-primary">
                    Close
               </button>

            </div>
        </div>
    </div>
  </div>
                
            
            </>
        ):(
            <>
            <h2 className="text-xl font-semibold text-gray-900">
      Raise Query 
    </h2>
             <form onSubmit={handleSubmit(onRaise)}>
  <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-900">
            Select the Package You’re Interested In
          </label>
          <div className="mt-2 grid grid-cols-1 relative">
            <select
              autoComplete="country-name"
              className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("package", { required: "Please select package" })}
            >
              <option value="">Select Package</option>
              {packages.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            {errors.package && <p className="text-sm text-red-600 mt-1">{errors.package.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-900">Patient Name</label>
          <div className="mt-2">
            <input
              placeholder="Full name"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("patientname", { required: "Please enter patient name" })}
            />
            {errors.patientname && <p className="text-sm text-red-600 mt-1">{errors.patientname.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-900">Email Address</label>
          <div className="mt-2">
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("email", { required: "Please enter email", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } })}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-900">Country</label>
          <div className="mt-2 relative">
            <select
              className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("country", { required: "Please select country" })}
            >
              <option value="">Select Country</option>
              {countries.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
            {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>}
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-900">Street Address</label>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter street address"
              autoComplete="street-address"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("streetAddress", { required: "Please enter street address" })}
            />
            {errors.streetAddress && <p className="text-sm text-red-600 mt-1">{errors.streetAddress.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900">City</label>
          <div className="mt-2">
            <input
              type="text"
              autoComplete="address-level2"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("city", { required: "Please enter city" })}
            />
            {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900">State / Province</label>
          <div className="mt-2">
            <input
              type="text"
              autoComplete="address-level1"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("state", { required: "Please enter state/province" })}
            />
            {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900">ZIP / Postal Code</label>
          <div className="mt-2">
            <input
              type="text"
              autoComplete="postal-code"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("zip", { required: "Please enter ZIP / Postal code" })}
            />
            {errors.zip && <p className="text-sm text-red-600 mt-1">{errors.zip.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900">Phone</label>
          <div className="mt-2">
            <input
              type="text"
              autoComplete="tel"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("phone", { required: "Please enter phone number" })}
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900">WhatsApp Number</label>
          <div className="mt-2">
            <input
              type="text"
              autoComplete="tel"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("whatsapp", { required: "Please enter WhatsApp number" })}
            />
            {errors.whatsapp && <p className="text-sm text-red-600 mt-1">{errors.whatsapp.message}</p>}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-900">Telegram ID / Number</label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("telegram")}
            />
            {errors.telegram && <p className="text-sm text-red-600 mt-1">{errors.telegram.message}</p>}
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-900">Subject</label>
          <div className="mt-2">
            <input
              type="text"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("subject", { required: "Please enter subject" })}
            />
            {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-900">Requirement</label>
          <div className="mt-2">
            <textarea
              rows="5"
              placeholder="Enter your requirement"
              className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 placeholder-gray-400 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              {...register("requirement", { required: "Please enter requirement" })}
            ></textarea>
            {errors.requirement && <p className="text-sm text-red-600 mt-1">{errors.requirement.message}</p>}
          </div>
        </div>

      </div>
    </div>
  </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={()=> onClose(false)} type="button" className="text-sm font-semibold text-gray-900">Cancel</button>
                        <button
                            disabled={buttonpost}
                            type="submit" className="btn btn-primary">

                            {buttonpost ? (
                                <>

                                    <div role="status">
                                        <svg aria-hidden="true" class="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>


                                </>
                            ) : (
                                <>
                                    Post
                                </>
                            )}
                        </button>
                    </div>
        </form>
            </>
        )}

   



  
  </div>
</div>

    
    </>);
}