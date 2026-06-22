import Image from "next/image";
import Link from "next/link";


export default function HowItWorks({title}){

    return (
        <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center mb-7">{title == null ? "How It Works" :  title} </h2>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-7.5 md:bg-[url('/images/how-works-bg.svg')] bg-no-repeat bg-size-[100%_auto] bg-position-[0_20%]">
                    <div className="px-7">
                        <div className="w-[100px] h-[100px] relative mx-auto [&]:after:content-[''] [&]:after:absolute [&]:after:top-[10px] [&]:after:left-[5px] [&]:after:w-full [&]:after:h-full [&]:after:bg-gray [&]:after:z-1 [&]:after:transform-[rotate(-15deg)] mb-12 [&]:after:rounded-[1.2rem]">
                            <div className="absolute top-0 right-0 w-[35px] h-[35px] text-secondary inline-flex justify-center items-center p-3 shadow-[0px_0px_30px_0px_#3E3D4233] translate-x-1/2 z-3 rounded-full">01</div>
                            <div className="w-full h-full bg-white flex justify-center items-center relative z-2 rounded-[1.2rem]">
                                <Image
                                    src="./images/how-works/img-1.svg"
                                    alt="Search Clinic/Hospital"
                                    width={48}
                                    height={48}
                                    className="w-1/2 h-1/2 object-contain"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="h4 mb-1">Search Clinic/Hospital</h4>
                            <div className="[&_>_*:last-child]:mb-0">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-7">
                        <div className="w-[100px] h-[100px] relative mx-auto [&]:after:content-[''] [&]:after:absolute [&]:after:top-[10px] [&]:after:left-[5px] [&]:after:w-full [&]:after:h-full [&]:after:bg-gray [&]:after:z-1 [&]:after:transform-[rotate(-15deg)] mb-12 [&]:after:rounded-[1.2rem]">
                            <div className="absolute top-0 right-0 w-[35px] h-[35px] text-secondary inline-flex justify-center items-center p-3 shadow-[0px_0px_30px_0px_#3E3D4233] translate-x-1/2 z-3 rounded-full">02</div>
                            <div className="w-full h-full bg-white flex justify-center items-center relative z-2 rounded-[1.2rem]">
                                <Image
                                    src="./images/how-works/img-2.svg"
                                    alt="Book Your Appointment"
                                    width={48}
                                    height={48}
                                    className="w-1/2 h-1/2 object-contain"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="h4 mb-1">Book Your Appointment</h4>
                            <div className="[&_>_*:last-child]:mb-0">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-7">
                        <div className="w-[100px] h-[100px] relative mx-auto [&]:after:content-[''] [&]:after:absolute [&]:after:top-[10px] [&]:after:left-[5px] [&]:after:w-full [&]:after:h-full [&]:after:bg-gray [&]:after:z-1 [&]:after:transform-[rotate(-15deg)] mb-12 [&]:after:rounded-[1.2rem]">
                            <div className="absolute top-0 right-0 w-[35px] h-[35px] text-secondary inline-flex justify-center items-center p-3 shadow-[0px_0px_30px_0px_#3E3D4233] translate-x-1/2 z-3 rounded-full">03</div>
                            <div className="w-full h-full bg-white flex justify-center items-center relative z-2 rounded-[1.2rem]">
                                <Image
                                    src="./images/how-works/img-1.svg"
                                    alt="Start Your Treatment"
                                    width={48}
                                    height={48}
                                    className="w-1/2 h-1/2 object-contain"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="h4 mb-1">Start Your Treatment</h4>
                            <div className="[&_>_*:last-child]:mb-0">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}