import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

export function RoleModuleLists({ roleid }) {
  const [modules, setModules] = useState([]);

  const fetchAssignModules = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/role-modules/${roleid}`);
      if (res.ok) {
        const data = await res.json();
        console.log("data",data);
        setModules(data);
      } else {
        console.error("Failed to fetch modules");
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  useEffect(() => {
    if (!roleid) return setModules([]);
    fetchAssignModules();
  }, [roleid]);

  const handleToggle = async (moduleId, field, value) => {
    try {
      debugger;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/role-modules/update-role-module`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            roleId: roleid,
            moduleId,
            field,
            value
          }),
        }
      );

      if (res.ok) {
        fetchAssignModules();
      }
    } catch (err) {
      console.error("Toggle update failed", err);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Module Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                  Description
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                   enable/disabel (Whole Module)
                </TableCell>


                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                  View
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                  Create
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                  Update
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs">
                  Delete
                </TableCell>

              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {modules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-4 text-center text-gray-500 text-theme-sm">
                    No modules assigned
                  </TableCell>
                </TableRow>
              ) : (
                modules.map((mod) => (
                  <TableRow key={mod.id}>
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800">
                      {mod.name}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                      {mod.description}
                    </TableCell>

                     <TableCell className="px-5 py-4 text-center">
                         <input
                        type="checkbox"
                        checked={!mod.status}
                        onChange={(e) =>
                          handleToggle(mod.id, "status", e.target.checked ? false : true)
                        }
                      />

                    </TableCell>


                    {/* ✅ VIEW */}
                    <TableCell className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={mod.canRead === true}
                        onChange={(e) =>
                          handleToggle(mod.id, "canRead", e.target.checked ? 1 : 0)
                        }
                      />
                    </TableCell>

                    {/* ✅ CREATE */}
                    <TableCell className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={mod.canCreate === true}
                        onChange={(e) =>
                          handleToggle(mod.id, "canCreate", e.target.checked ? 1 : 0)
                        }
                      />
                    </TableCell>

                    {/* ✅ UPDATE */}
                    <TableCell className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={mod.canUpdate === true}
                        onChange={(e) =>
                          handleToggle(mod.id, "canUpdate", e.target.checked ? 1 : 0)
                        }
                      />
                    </TableCell>

                    {/* ✅ DELETE */}
                    <TableCell className="px-5 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={mod.canDelete === true}
                        onChange={(e) =>
                          handleToggle(mod.id, "canDelete", e.target.checked ? 1 : 0)
                        }
                      />
                      
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
