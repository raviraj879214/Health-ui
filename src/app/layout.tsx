'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import { HeaderFrontend } from "../components-front-end/shared/Header";
import FooterWrapper from "../components-front-end/shared/footerWrapper";
import gilroy from "./fonts";
import ReduxProvider from '@/components-front-end/redux/partnerregister/provider';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isPartner = pathname.startsWith('/partner');


  if (isAdmin) {
    return (
      <html lang="en">
        <head>
          <meta name="revisit-after" content="never" />
          <meta name="yahooseeker" content="noindex, nofollow" />
          <meta name="msnbot" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
          <meta name="allow-search" content="no" />
        </head>
        <body>
          {children}
        </body>
      </html>
    );
  }
  
  if (isPartner) {
    return (
      <html lang="en">
        <head>
          <meta name="revisit-after" content="never" />
          <meta name="yahooseeker" content="noindex, nofollow" />
          <meta name="msnbot" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
          <meta name="allow-search" content="no" />
        </head>
        <body>
          
            <>{children}</>
        </body>
      </html>
    );
  }




  return (
    <html lang="en">
       <head>
        <meta name="revisit-after" content="never" />
        <meta name="yahooseeker" content="noindex, nofollow" />
        <meta name="msnbot" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="allow-search" content="no" />
      </head>
      <body className={`${gilroy.variable} antialiased`}>
          <HeaderFrontend></HeaderFrontend>
           <ReduxProvider>{children}</ReduxProvider>
          <FooterWrapper></FooterWrapper>
      </body>
    </html>
  );




}
