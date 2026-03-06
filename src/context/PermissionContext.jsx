"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const PermissionContext = createContext(undefined);

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);

 
  useEffect(() => {
    try {
      const fromStorage = localStorage.getItem("permissions");
    
      if (fromStorage) {
        setPermissions(JSON.parse(fromStorage));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

/**
 * Two usage patterns:
 * 1) const { permissions, setPermissions } = usePermissions();
 * 2) const { canRead, canCreate } = usePermissions("Products");
 */
export const usePermissions = (moduleName) => {
  const ctx = useContext(PermissionContext);
  if (!ctx) {
    throw new Error("usePermissions must be used inside PermissionProvider");
  }
  const { permissions, setPermissions } = ctx;

  if (!moduleName) {
    return { permissions, setPermissions };
  }

  const found = permissions.find(
    (p) => p.module?.name?.toLowerCase() === moduleName.toLowerCase()
  );

  return {
    ...(found || {
      status : false,
      canCreate: false,
      canUpdate: false,
      canRead: false,
      canDelete: false,
    }),
    
    setPermissions,
  };
};
