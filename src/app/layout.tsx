'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import { HeaderFrontend } from "../components-front-end/shared/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isPartner = pathname.startsWith('/partner');


  if (isAdmin) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }
  
  if (isPartner) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }




  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-800 antialiased">
          <HeaderFrontend></HeaderFrontend>
          <div className="min-h-screen flex items-center justify-center text-3xl font-semibold">
            {children}
          </div>
        </div>
      </body>
    </html>
  );




}
