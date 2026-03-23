



export function FundRelease({id,sentamount,totalamount}) {

    const sentAmount = sentamount.filter(t => t.metadata.patientqueryid === id);
    const totalTransfer = sentAmount.reduce((sum, t) => sum + t.amount, 0) / 100;

    const percentage = Math.round(((totalTransfer / totalamount) * 100));


    return (<>

       

        <div className="w-full max-w-[200px]">
            {/* Label above progress bar */}
            <span
  className={`text-sm font-medium px-2 py-1 rounded-full cursor-pointer ${
    percentage <= 30
      ? "bg-yellow-100 text-yellow-800"
      : percentage < 100
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800"
  }`}
  title={
    percentage <= 30
      ? "0-30%: Initial Fund Released"
      : percentage < 100
      ? "31-99%: Partially Fund Released"
      : "100%: Full Fund Released"
  }
>
  Fund Release
</span>

            {/* Progress bar + percentage */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 h-2 rounded-sm bg-gray-200 dark:bg-gray-800">
                    <div
                        className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>

                {/* Percentage label */}
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {percentage ? `${percentage}%` : "0%"}
                </span>
            </div>
        </div>

    </>);
}