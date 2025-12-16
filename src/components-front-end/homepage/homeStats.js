import Image from "next/image";
import Link from "next/link";


export default function HomeStats(){

    return (
        <div className="my-18">
            <div className="container">
                <div className="relative grid lg:grid-cols-4 grid-cols-2 [&]:after:content-[''] [&]:after:absolute [&]:after:bottom-0 [&]:after:left-0 [&]:after:w-full [&]:after:h-[2px] [&]:after:bg-white [&]:after:z-1 [&]:before:content-[''] [&]:before:absolute [&]:before:top-0 [&]:before:right-0 [&]:before:w-[2px] [&]:before:h-full [&]:before:bg-white [&]:before:z-1">
                    <div className="stat-card p-5 text-center border-r border-border border-b">
                        <Image
                            src="/images/stats/stat-1.svg"
                            alt="Best Clinics"
                            width={48}
                            height={48}
                            className="w-[48px] h-[48px] object-contain mb-7 mx-auto"
                        />
                        <p className="h2 mb-2.5 leading-none">530+</p>
                        <p className="mb-0">Best Clinics</p>
                    </div>
                    <div className="stat-card p-5 text-center border-r border-border border-b">
                        <Image
                            src="/images/stats/stat-2.svg"
                            alt="Top Rated Clinics"
                            width={48}
                            height={48}
                            className="w-[48px] h-[48px] object-contain mb-7 mx-auto"
                        />
                        <p className="h2 mb-2.5 leading-none">375+</p>
                        <p className="mb-0">Top Rated Clinics</p>
                    </div>
                    <div className="stat-card p-5 text-center border-r border-border border-b">
                        <Image
                            src="/images/stats/stat-3.svg"
                            alt="Specialists"
                            width={48}
                            height={48}
                            className="w-[48px] h-[48px] object-contain mb-7 mx-auto"
                        />
                        <p className="h2 mb-2.5 leading-none">1000+</p>
                        <p className="mb-0">Specialists</p>
                    </div>
                    <div className="stat-card p-5 text-center border-r border-border border-b">
                        <Image
                            src="/images/stats/stat-4.svg"
                            alt="Patients Recovered"
                            width={48}
                            height={48}
                            className="w-[48px] h-[48px] object-contain mb-7 mx-auto"
                        />
                        <p className="h2 mb-2.5 leading-none">15000+</p>
                        <p className="mb-0">Patients Recovered</p>
                    </div>
                </div>
            </div>
        </div>
    )
}