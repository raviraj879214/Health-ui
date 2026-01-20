"use client"
import Link from "next/link";
import Image from "next/image";


export  function ProductCardRated({ data }){
    return (

        
        <div className="card a-hover-secondary">
            <div className="relative overflow-hidden rounded-thm pb-[70%] mb-4.5">
                <Link href={`/clinics/${data.uuid}`}>
                    <img
                        src={
                                data.clinicbanner
                                ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/clinic/banner/${data.clinicbanner}`
                                : "/default-banner.jpg" 
                            }
                        alt={data.clinicbanner}
                        width={370}
                        height={254}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "/images/fallback.png";
                        }}
                    />
                </Link>
            </div>
            <div className="content">
                <div className="flex justify-between items-center gap-5 mb-4 leading-none">
                    <div className="flex items-center">
                        <span className="inline-block ">
                           <b>{data.name} </b>
                        </span>
                    </div>
                    {/* <span className="rating inline-flex items-center">
                        <svg width="15" height="14" className="me-1" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9583 5.66827C15.9071 5.51316 15.8104 5.37621 15.6802 5.2745C15.5501 5.17278 15.3922 5.1108 15.2262 5.09627L10.6082 4.68603L8.78208 0.504711C8.64739 0.198289 8.34076 0 8.00006 0C7.65937 0 7.35271 0.19832 7.21808 0.505475L5.39197 4.68606L0.773199 5.09627C0.60745 5.11112 0.449802 5.17324 0.3198 5.27492C0.189798 5.3766 0.0931609 5.51337 0.0418688 5.66827C-0.0634775 5.98524 0.0338061 6.33287 0.290531 6.55201L3.78124 9.54683L2.7519 13.9825C2.67659 14.3086 2.80597 14.6458 3.0826 14.8414C3.23126 14.9465 3.40523 15 3.58064 15C3.7319 15 3.8819 14.9601 4.01659 14.8813L8.00006 12.5522L11.9821 14.8813C12.2735 15.0528 12.6408 15.0371 12.9168 14.8414C13.0519 14.7457 13.1553 14.6133 13.2141 14.4606C13.2729 14.3079 13.2845 14.1416 13.2475 13.9825L12.2182 9.54683L15.7089 6.55262C15.8344 6.44533 15.925 6.30432 15.9694 6.14709C16.0137 5.98987 16.0098 5.82337 15.9583 5.66827Z" fill="#FFC107"/></svg><span>{data.rating}</span>
                    </span> */}
                </div>
                <h4 className="h4"><Link href="/clinics/sdfsd">{data.title}</Link></h4>
            </div>
        </div>



    )
}