

export function HeaderFrontend(){

    return(<>
    
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold">P</div>
          <div>
            <div className="font-semibold">HealthTech</div>
            <div className="text-xs text-slate-500"></div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a className="hover:underline" href="#features">Features</a>
          <a className="hover:underline" href="pricing">Pricing</a>
          <a className="hover:underline" href="#testimonials">Testimonials</a>
          <button className="ml-4 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">Get Started</button>
        </nav>
      </header>
    
    </>);
}