

import Cookies from "js-cookie";

export const adminHeaders = async () => {
  
  const resToken = await fetch("/api/auth/get-token");
  const token = await resToken.json();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.token}`,
  };
  
};
