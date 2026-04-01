import Image from "next/image";
import Link from "next/link";

export default function FreeQuote(){
    return (
        <div className="my-18">
            <div className="container">
                <div className="bg-primary text-white rounded-thm flex md:flex-nowrap flex-wrap items-center justify-between gap-3 md:px-12 md:py-14 px-5 py-7.5">
                    <div className="m-0">
                        <h2 className="h2 mb-1">Get Better Care For Your Health</h2>
                        <div className="[&_>_*:last-child]:mb-0">
                            <p>Get A Free Quote</p>
                        </div>
                    </div>
                    <Link href={`${process.env.NEXT_PUBLIC_URL}/order-create/demo-id/demo-clinic`} className="btn btn-secondary">Get A Free Quote</Link>
                </div>
            </div>
        </div>
    )
}