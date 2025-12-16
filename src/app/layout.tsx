'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import { HeaderFrontend } from "../components-front-end/shared/Header";
import FooterWrapper from "../components-front-end/shared/footerWrapper";
import gilroy from "./fonts";


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
      <body className={`${gilroy.variable} antialiased`}>
          <HeaderFrontend></HeaderFrontend>
            {children}
          <FooterWrapper></FooterWrapper>
      </body>
    </html>
  );




}
