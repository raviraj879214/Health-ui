export default function PackageCardLoader(){
    return (
        <div className="animate-pulse border md:pt-10 md:pb-7.5 md:px-7.5 px-5 pt-8 pb-5 rounded-thm h-full relative flex flex-col items-start border-border">
            <div className="h-6 bg-loader rounded-full w-full mb-5"></div>
            <div className="h-14 bg-loader rounded-thm w-full mb-5"></div>
            <ul className="[&_li:not(:last-child)]:mb-2 list-none p-0 mb-5 w-full">
                <li className="h-3 bg-loader rounded-full w-full"></li>
                <li className="h-3 bg-loader rounded-full w-full"></li>
                <li className="h-3 bg-loader rounded-full w-full"></li>
                <li className="h-3 bg-loader rounded-full w-full"></li>
                <li className="h-3 bg-loader rounded-full w-full"></li>
                <li className="h-3 bg-loader rounded-full w-full"></li>
                <li className="h-3 bg-loader rounded-full w-full"></li>
            </ul>
            <div className="h-10 bg-loader rounded-thm w-7/10 mx-auto"></div>
        </div>
    )
}