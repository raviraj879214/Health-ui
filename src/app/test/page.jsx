



export default function Page(){




    return(<>
    <div className="bg-gray-100">
  <div className="container mx-auto py-8">
    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
      <div className="col-span-4 sm:col-span-3">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/94.jpg"
              className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
            />
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-gray-700">Software Developer</p>
           
          </div>
          <hr className="my-6 border-t border-gray-300" />
          <div className="flex flex-col">
            <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
              Skills
            </span>
            <ul>
              <li className="mb-2">JavaScript</li>
              
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-4 sm:col-span-9">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
            est vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean
            posuere risus non velit egestas suscipit. Nunc finibus vel ante id
            euismod. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla
            vulputate pharetra tellus, in luctus risus rhoncus id.
          </p>
         
          
          
          
        </div>
      </div>
    </div>
  </div>
</div>

    
        
    </>);
}