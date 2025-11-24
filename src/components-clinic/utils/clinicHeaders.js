import Cookies from "js-cookie";

export const clinicHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${Cookies.get("clinic_access")}`,
});
