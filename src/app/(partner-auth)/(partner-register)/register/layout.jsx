

import { ToastContainer } from "react-toastify";
import ReduxProvider from "../../../../components-front-end/redux/partnerregister/provider";

export default function RootLayout({ children }) {
  return (
   <>
   
        <ToastContainer   position="bottom-right" />

       {children}
     </>
  );
}
