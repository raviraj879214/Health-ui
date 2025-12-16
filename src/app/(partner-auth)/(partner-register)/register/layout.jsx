

import { ToastContainer } from "react-toastify";
import ReduxProvider from "../../../../components-front-end/redux/partnerregister/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer   position="bottom-right" />

        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
