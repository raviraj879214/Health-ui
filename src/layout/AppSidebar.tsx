"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  PlugInIcon,
  EnvelopeIcon
} from "../icons/index";
import { Package } from "lucide-react";


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};











// const navItems: NavItem[] = [
//   {
//     icon: <GridIcon />,
//     name: "Dashboard",
//     // subItems: [{ name: "Ecommerce", path: "/", pro: false }],
//   },
//   // {
//   //   icon: <CalenderIcon />,
//   //   name: "Calendar",
//   //   path: "/calendar",
//   // },
//   // {
//   //   icon: <UserCircleIcon />,
//   //   name: "User Profile",
//   //   path: "/profile",
//   // },

//   // {
//   //   name: "Forms",
//   //   icon: <ListIcon />,
//   //   subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
//   // },
//   // {
//   //   name: "Tables",
//   //   icon: <TableIcon />,
//   //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
//   // },
//   // {
//   //   name: "Pages",
//   //   icon: <PageIcon />,
//   //   subItems: [
//   //     { name: "Blank Page", path: "/blank", pro: false },
//   //     { name: "404 Error", path: "/error-404", pro: false },
//   //   ],
//   // },
// ];



const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {


  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [roelaccess, setroleaccess] = useState("");




  const navItems: NavItem[] = [


    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
      name: "Dashboard",
      path: "/admin",
    },

    ...(roelaccess === "SuperAdmin"
      ? [
        {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87M20 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
          ),
          name: "Roles Management",
          subItems: [
            { name: "Roles", path: "/admin/manage-roles", pro: false },
            { name: "Assign Modules", path: "/admin/assign-modules", pro: false },
            { name: "Manage User", path: "/admin/manage-user", pro: false },
            { name: "Manage Cordinator", path: "/admin/manage-cordinator", pro: false },
          ],
        },
      ]
      : []),



    // {
    //     icon: (
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
    //     strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    //     <rect x="3" y="5" width="18" height="14" rx="2" />
    //     <path d="M3 7l9 6 9-6" />
    //   </svg>
    //     ),
    //     name: "Manage Email Templates",
    //     path: "/admin/manage-email-templates",
    // },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M22 12H18L14 20L10 4L6 12H2" />
        </svg>
      ),
      name: "Admin Activities",
      path: "/admin/admin-activities",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 8h8M8 12h6M8 16h5" />
        </svg>
      ),
      name: "Manage Faq's",
      path: "/admin/faqs",
    },

    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>),
      name: "Manage Seo",
      path: "/admin/manage-seo-content",
    },

    {
      icon: (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2">
  <path d="M6 3v6a4 4 0 0 0 8 0V3"/>
  <path d="M14 15a4 4 0 0 0 8 0v-1"/>
  <circle cx="20" cy="10" r="2"/>
</svg>


      ),
      name: "Manage Specialty",
      subItems: [
        { name: "Manage Specialty", path: "/admin/manage-specialties", pro: false },
        { name: "Manage Sub Specialty", path: "/admin/manage-sub-specialties", pro: false },
        { name: "Manage Treatment", path: "/admin/manage-treatments", pro: false },
        { name: "Manage Procedure", path: "/admin/manage-procedure", pro: false },
      ],
    },

    {
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M9 7V4h6v3" />
          <path d="M12 10v6" />
          <path d="M9 13h6" />
          <rect x="7" y="11" width="2" height="2" />
          <rect x="15" y="11" width="2" height="2" />
        </svg>
      ),
      name: "Clinic Management",
      subItems: [
        { name: "Manage Clinic", path: "/admin/manage-clinics", pro: false },
        // { name: "Manage Packages", path: "/admin/manage-packages", pro: false },
      ],
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
          xmlns="http://www.w3.org/2000/svg">


          <path d="M30 10H42V20H36L30 26V10Z"
            stroke="currentColor" stroke-width="2"
            stroke-linejoin="round" />
          <rect x="34" y="13" width="4" height="2" fill="currentColor" />
          <rect x="35" y="12" width="2" height="4" fill="currentColor" />


          <circle cx="12" cy="16" r="3" stroke="currentColor" stroke-width="2" />
          <path d="M12 19V28M12 28L7 36M12 28L17 36"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" />
        </svg>



      ),
      name: "Patient Queries",
      path: "/admin/patient-queries",
    },
    {
      icon:
        (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="12" r="6" stroke="currentColor" stroke-width="2" />
            <path d="M18 8V4M18 4L15 7M18 4L21 7"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        ),
      name: "Manage Payouts",
      path: "/admin/manage-payout",
    },
    {
      icon:
        (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4 20V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M10 20V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M16 20V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M22 20H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        ),
      name: "Manage Reports",
      path: "/admin/manage-report",
    },
    {
      icon:
        (
          <Package className="w-6 h-6" />
        ),
      name: "Manage Boost Package",
      path: "/admin/manage-package",
    },





  ];

  useEffect(() => {

    getroleaccess();

  }, []);


  const getroleaccess = async () => {
    const res = await fetch(`/api/auth/get-admin-role`, {
      cache: "no-store", // ensure fresh cookie every time
    });

    if (!res.ok) throw new Error("Failed to fetch token");

    const data = await res.json();
    setroleaccess(data.adminrole)
    console.log("App sidebar", data);
  }


  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={` ${openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`${isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
          }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden "
                src="/images/logo/logo-new.png"
                alt="Logo"
                width={200}
                height={60}

              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar ">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div> */}
          </div>
        </nav>

      </div>
    </aside>
  );
};

export default AppSidebar;
