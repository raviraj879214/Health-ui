"use client";

import Cookies from "js-cookie";

/**
 * Logout clinic user: call API, clear cookies, redirect
 */
export async function clinicLogout() {
  try {
    const accessToken = Cookies.get("clinic_access");

    // Call logout API only if access token exists
    if (accessToken) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.warn("Logout API failed, proceeding to clear cookies anyway");
      } else {
        const data = await res.json();
        console.log("Logout API response:", data);
      }
    }

    // Clear tokens from cookies
    Cookies.remove("clinic_access");
    Cookies.remove("clinic_refresh");

    // Redirect to login page
    window.location.href = "/partner-login";
  } catch (err) {
    console.error("Error during logout:", err);

    // Ensure logout even if API fails
    Cookies.remove("clinic_access");
    Cookies.remove("clinic_refresh");
    window.location.href = "/partner/login";
  }
}
