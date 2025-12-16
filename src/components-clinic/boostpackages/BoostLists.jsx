



export default function BoostList({ packages }) {
  return (

    <div className="space-y-4">
      {packages.map(pkg => (
        <div key={pkg.id} className="border p-4 rounded-lg flex justify-between">
          <div>
            <p className="font-semibold">{pkg.name}</p>
            <p className="text-gray-600">{pkg.price}</p>
          </div>
          <button className="btn btn-primary">
            Pay Now
          </button>
        </div>
      ))}
    </div>


  );
}
