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
          <meta name="google-site-verification" content="uWahxjIdmOwpAs7uYrvuczD78PwhbrWzKRaUh96kc5I" />
          <meta name="revisit-after" content="always" />
          <meta name="yahooseeker" content="index, follow" />
          <meta name="msnbot" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="allow-search" content="yes" />
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
          <meta name="google-site-verification" content="uWahxjIdmOwpAs7uYrvuczD78PwhbrWzKRaUh96kc5I" />
          <meta name="revisit-after" content="always" />
          <meta name="yahooseeker" content="index, follow" />
          <meta name="msnbot" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="allow-search" content="yes" />
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
        <meta name="google-site-verification" content="uWahxjIdmOwpAs7uYrvuczD78PwhbrWzKRaUh96kc5I" />
        <meta name="revisit-after" content="always" />
        <meta name="yahooseeker" content="index, follow" />
        <meta name="msnbot" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="allow-search" content="yes" />
      </head>
      <body className={`${gilroy.variable} antialiased`}>
          <HeaderFrontend></HeaderFrontend>
           <ReduxProvider>{children}</ReduxProvider>
          <FooterWrapper></FooterWrapper>
      </body>
    </html>
  );




}
