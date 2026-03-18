"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { formatBrazilDate } from "@/lib/formatDate";





export function PaymentDetails({querydetails}){



     const paymentDetails = querydetails?.paymentDetails || [];

      const totalPlatformFee = paymentDetails.filter(x=>x.status === 1).reduce((sum, item) => {
        const fee = Number(item.platformfee);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);


      const totalVendorFee = paymentDetails.filter(x=>x.status === 1).reduce((sum, item) => {
        const fee = Number(item.vendorfee);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);

       const totalGeneratedAmount = paymentDetails.filter(x=>x.status === 1).reduce((sum, item) => {
        const fee = Number(item.generatedamount);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);




    return (<>


         


        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Payment Details
            </h2>



            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">

                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Created Date
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Package Price
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Final Price
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Message
                            </th>



                            <th scope="col" className="px-6 py-3 font-medium">
                                Generated Amount
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Commission
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Health Tech Commision fee
                            </th>
                            <th scope="col" className="px-6 py-3 font-medium">
                                Clinic Fee
                            </th>



                            <th scope="col" className="px-6 py-3 font-medium">
                                Status
                            </th>



                        </tr>
                    </thead>
                    <tbody>
                        {querydetails.paymentDetails?.map((item) => (
                            <tr key={item.id} className="bg-neutral-primary border-b border-default">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {formatBrazilDate(item.createdAt)}
                                </th>
                                <td className="px-6 py-4">
                                    {brazilianCurrency(item.packageprice || 0)}
                                </td>
                                <td className="px-6 py-4">
                                    {brazilianCurrency(item.finalprice || 0)}
                                </td>
                                <td className="px-6 py-4 break-words whitespace-normal relative">
                                    <input
                                        type="checkbox"
                                        id={`toggle-note-${item.id}`}  // unique per row
                                        className="hidden peer"
                                        disabled={!item.note}           // optional: disable if no text
                                    />
                                    <span className="line-clamp-3 peer-checked:line-clamp-none">
                                        {item.note || "--"}
                                    </span>
                                    {item.note && (
                                        <label
                                            htmlFor={`toggle-note-${item.id}`} // matches the input id
                                            className="text-blue-500 text-sm cursor-pointer ml-1"
                                        >
                                            show more
                                        </label>
                                    )}
                                </td>



                                <td className="px-6 py-4">
                                    {brazilianCurrency(item.generatedamount)}
                                </td>

                                <td className="px-2 py-2 flex align-content-center">
                                    <span className="text-xs px-2 py-1 rounded border border-orange-400 text-orange-600">
                                        {item.commission}%
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    {brazilianCurrency(item.platformfee)}
                                </td>
                                <td className="px-6 py-4">
                                    {brazilianCurrency(item.vendorfee)}
                                </td>

                                <td className="px-6 py-4">
                                    {item.status === 0 && (
                                        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-gray-200 text-gray-800">
                                            Pending
                                        </span>
                                    )}

                                    {item.status === 1 && (
                                        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-200 text-green-800">
                                            Received
                                        </span>
                                    )}


                                </td>


                            </tr>
                        ))}

                        <tr>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">Total {brazilianCurrency(totalGeneratedAmount)}</td>
                            <td className="px-6 py-4"></td>


                            <td className="px-6 py-4">Total {brazilianCurrency(totalPlatformFee)}</td>
                            <td className="px-6 py-4">Total {brazilianCurrency(totalVendorFee)}</td>
                            <td className="px-6 py-4"></td>
                            
                            <td className="px-6 py-4"></td>


                        </tr>


                    </tbody>
                </table>
            </div>



        </ComponentCard>


    </>);
}