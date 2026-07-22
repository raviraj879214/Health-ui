"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

export function HeaderFrontend() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  useEffect(() => {
    var mobileMenuItems = document.querySelectorAll('.mobile-menu ul li a:not(.menu-item-has-children > a)');

    // console.log(mobileMenuItems, 'mobileMenuItems');

    mobileMenuItems.forEach((item) => item.addEventListener('click', function () {
      setMenuOpen(false)
    }));

    const menuItems = document.querySelectorAll(".menu-item-has-children");

    menuItems.forEach((item) => {
      const parentLink = item.querySelector(":scope > a");
      const submenu = item.querySelector(":scope > .sub-menu");

      if (!parentLink || !submenu) return;

      submenu.style.display = "none"; // hide all submenu by default

      function toggle(e) {
        e.preventDefault();
        slideToggle(submenu, 300);
        parentLink.classList.toggle("active");
      }

      parentLink.addEventListener("click", toggle);

      // cleanup
      return () => {
        parentLink.removeEventListener("click", toggle);
      };
    });
  }, []);

  // --- SlideToggle Helper Functions ---
  function slideToggle(el, duration = 300) {
    if (window.getComputedStyle(el).display === "none") {
      slideDown(el, duration);
    } else {
      slideUp(el, duration);
    }
  }

  function slideUp(el, duration = 300) {
    el.style.height = el.offsetHeight + "px";
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";

    requestAnimationFrame(() => {
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
      el.style.marginTop = 0;
      el.style.marginBottom = 0;
    });

    setTimeout(() => {
      el.style.display = "none";
      el.removeAttribute("style");
    }, duration);
  }

  function slideDown(el, duration = 300) {
    el.style.display = "block";
    let height = el.offsetHeight;
    el.style.height = "0px";
    el.style.overflow = "hidden";

    requestAnimationFrame(() => {
      el.style.transitionProperty = "height, margin, padding";
      el.style.transitionDuration = duration + "ms";
      el.style.height = height + "px";
    });

    setTimeout(() => {
      // el.removeAttribute("style");
      el.style.display = "block";
    }, duration);
  }


  const [slugs,setSlugs] = useState([]);
  useEffect(() => {
    fetchSlug();
  }, []);


  const fetchSlug = async()=>{
    debugger;
    const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-seo-slug`,{
      method : "Get",
      headers :{
        "Content-Type" : "application/json"
      }
    });

    if(res.ok){
      const result= await res.json();
      setSlugs(result.data);
    }
  }







  return (
    <header className="relative z-200 md:px-7.5 px-5 py-5 text-[14px]">
      <div className="flex flex-nowrap items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Nairobi"
              width={340}
              height={40}
              className="md:max-w-[100%] max-w-[200px]"
            />
          </Link>
       
        </div>

        {/* Nav + Actions */}
        <div className="flex flex-nowrap items-center justify-end gap-5 text-dark-gray grow-1">
          {/* Desktop Nav */}
          <ul className="hidden xl:flex flex-wrap justify-center items-center p-0 m-0 list-none gap-5 grow-[0.3] [&_a]:tansition [&_a]:hover:text-black">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={`${slugs.find(x => x.title === "About Us")?.slug || ""}`}>About Us</Link>
            </li>
            
            <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="btn btn-none inline-flex items-center justify-center gap-3">
                 <a
                          href={slugs.find(x => x.title === "Treatments")?.slug || ""}
                          className="text-gray-700">
                          Treatment
                        </a>
                  <span className="icon">
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 13 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.8735 1L6.48165 6L0.999899 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </MenuButton>

                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-2.5"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-2.5"
                >
                  <MenuItems className="absolute left-0 z-50 mt-2 w-56 origin-top-left bg-white shadow-[0_0_30px_0_rgba(45,45,45,0.15)] rounded-thm focus:outline-none">
                    <div className="py-1">

                     

                      <div>
                        <a
                          href={slugs.find(x => x.title === "Plastic Surgery")?.slug || ""}
                          className="block px-4 py-2 text-sm font-medium text-gray-700"
                        >
                          Plastic Surgery
                        </a>

                        {/* Always Visible Sub Menu */}
                        <div className="ml-4 border-l border-gray-200">
                          <a
                            href={slugs.find(x => x.title === "Liposuction")?.slug || ""}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#2AB3B1]"
                          >
                            Liposuction
                          </a>
                        </div>
                      </div>

                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "IVF")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          IVF
                        </a>
                      </MenuItem>

                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "Orthopedic")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Orthopedic
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "Maternity")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Maternity
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "Dental Treatment")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Dental Treatment
                        </a>
                      </MenuItem>

                     

                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </li>
            <li>
              <Link href={`${slugs.find(x => x.title === "Why Brazil")?.slug || ""}`}>Why Brazil?</Link>
            </li>
            <li>
              <Link href={`${slugs.find(x => x.title === "Your Guarantees")?.slug || ""}`}>Your Guarantees </Link>
            </li>

            <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="btn btn-none inline-flex items-center justify-center gap-3">
                  Additional Services <span className="icon"><svg width="12" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8735 1L6.48165 6L0.999899 1" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </MenuButton>

                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-2.5"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-2.5"
                >
                  <MenuItems className="absolute right-0 z-50 mt-2 md:w-[180px] w-40 origin-top-right bg-white shadow-[0_0_30px_0_rgba(45,45,45,0.15)] rounded-thm focus:outline-none [&_a]:hover:text-secondary">
                    <div className="py-1 max-h-45 overflow-auto">
                      <MenuItem>
                        <Link href={`${slugs.find(x => x.title === "Insurance")?.slug || ""}`} className="block px-4 py-1.5 font-medium text-sm text-gray-700">
                          Insurance
                        </Link>
                      </MenuItem>



                      <MenuItem>
                        <Link href={`${slugs.find(x => x.title === "Visa")?.slug || ""}`} className="block px-4 py-1.5 font-medium text-sm text-gray-700">
                          Visas
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href={`${slugs.find(x => x.title === "Citizenship")?.slug || ""}`} className="block px-4 py-1.5 font-medium text-sm text-gray-700">
                          Citizenship by Birth
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href={`${slugs.find(x => x.title === "Flights")?.slug || ""}`} className="block px-4 py-1.5 font-medium text-sm text-gray-700">
                          Flights, Hotels and Transportation
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href={`${slugs.find(x => x.title === "Personal Assistance")?.slug || ""}`} className="block px-4 py-1.5 font-medium text-sm text-gray-700">
                          Personal Assistance
                        </Link>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </li>
          </ul>

          {/* Example HeadlessUI Dropdown */}
         <div className="md:flex hidden gap-4">
  <Link
    href="/register"
    className="btn btn-secondary md:px-4 px-3 py-3 focus:outline-none"
  >
    Become a Partner
  </Link>

  <Link
    href="/order-create/demo-id/demo-clinic"
    className="btn btn-primary md:px-4 px-3 py-3 focus:outline-none"
  >
    Get a Free Quote
  </Link>

  <Menu as="div" className="relative inline-block">
    <MenuButton className="inline-flex w-[120px] justify-between items-center gap-x-5 md:px-4 px-3 py-3 focus:outline-none btn btn-secondary active-icon-rotate">
      Login
      <span className="icon inline-block transition-all duration-200 ease-in-out">
        <svg width="12" height="7" viewBox="0 0 13 7" fill="none">
          <path
            d="M11.8735 6L6.48165 1L0.999899 6"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </MenuButton>

    <Transition>
      <MenuItems className="absolute right-0 z-50 mt-2 md:w-full w-40 origin-top-right bg-white shadow-[0_0_30px_0_rgba(45,45,45,0.15)] rounded-thm focus:outline-none">
        <div className="py-1">
          <MenuItem>
            <Link
              href="/partner-login"
              className="block px-4 py-1.5 font-medium text-sm text-gray-700"
            >
              For Clinics
            </Link>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</div>


          {/* Mobile menu toggle */}
          <div className="menu-bar-wpr xl:hidden">
            <button
              type="button"
              className={`menu-bar menu-bar-primary ${menuOpen ? "active" : ""}`}
              onClick={() => {
                setMenuOpen((prev) => !prev);
              }}
            >
              <span className="bars bar1"></span>
              <span className="bars bar2"></span>
              <span className="bars bar3"></span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu transition-all duration-300 border-t border-border ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
        <div className="flex flex-col h-full items-center max-h-full overflow-auto md:px-7.5 py-5 px-5">
          <ul className="font-bold md:text-lg text-[1rem] w-full p-0 m-0 list-none mb-5">
            <li>
              <Link href="/" className="flex items-center justify-between gap-2.5">Home</Link>
            </li>
            <li>
              <Link href={`${slugs.find(x => x.title === "About Us")?.slug || ""}`} className="flex items-center justify-between gap-2.5">About Us</Link>
            </li>

             <li>
              <Menu as="div" className="relative inline-block">
                <MenuButton className="btn btn-none inline-flex items-center justify-center gap-3">
                 <a
                          href={slugs.find(x => x.title === "Treatments")?.slug || ""}
                          className="text-gray-700 font-bold"
                        >
                          Treatment
                        </a>
                  <span className="icon">
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 13 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.8735 1L6.48165 6L0.999899 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </MenuButton>

                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-2.5"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-2.5"
                >
                  <MenuItems className="absolute left-0 z-50 mt-2 w-56 origin-top-left bg-white shadow-[0_0_30px_0_rgba(45,45,45,0.15)] rounded-thm focus:outline-none">
                    <div className="py-1 p-6">
                      <div>

                        <a
                          href={slugs.find(x => x.title === "Plastic Surgery")?.slug || ""}
                          className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Plastic Surgery
                        </a>

       
                        <div className="ml-4 border-l border-gray-200">
                          <a
                            href={slugs.find(x => x.title === "Liposuction")?.slug || ""}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-[#2AB3B1]"
                          >
                            Liposuction
                          </a>
                        </div>
                      </div>

                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "IVF")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          IVF
                        </a>
                      </MenuItem>

                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "Orthopedic")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Orthopedic
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "Maternity")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Maternity
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a href={`${slugs.find(x => x.title === "Dental Treatment")?.slug || ""}`} className="block px-4 py-2 text-sm font-medium text-gray-700">
                          Dental Treatment
                        </a>
                      </MenuItem>

                     

                    </div>
                  </MenuItems>

                  
                </Transition>
              </Menu>
            </li>


            <li>
              <Link href={`${slugs.find(x => x.title === "Why Brazil")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Why Brazil?</Link>
            </li>
            <li>
              <Link href={`${slugs.find(x => x.title === "Your Guarantees")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Your Guarantees</Link>
            </li>
            <li className="menu-item-has-children">
              <Link href="#" className="flex items-center justify-between gap-2.5">Additional Services <span className="icon"><svg width="12" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8735 1L6.48165 6L0.999899 1" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></span></Link>
              <ul className="hidden p-0 m-0 list-none sub-menu">
                <li>
                  <Link href={`${slugs.find(x => x.title === "Insurance")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Insurance</Link>
                </li>
                <li>
                  <Link href={`${slugs.find(x => x.title === "Visa")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Visas</Link>
                </li>
                <li>
                  <Link href={`${slugs.find(x => x.title === "Citizenship")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Citizenship</Link>
                </li>
                <li>
                  <Link href={`${slugs.find(x => x.title === "Flights")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Flights</Link>
                </li>

                <li>
                  <Link href={`${slugs.find(x => x.title === "Personal Assistance")?.slug || ""}`} className="flex items-center justify-between gap-2.5">Personal Assistance</Link>
                </li>
              </ul>
            </li>
          </ul>
          {/* MOBILE BUTTONS */}
          <div className="md:hidden flex flex-col gap-3 w-full">

            <a
              href="/register"
              className="btn btn-secondary md:px-4 px-3 py-3 focus:outline-none w-full"
            >
              Become a Partner
            </a>

            <a
              href="/order-create/demo-id/demo-clinic"
              className="btn btn-primary md:px-4 px-3 py-3 focus:outline-none w-full"
            >
              Get a Free Quote
            </a>

            <a
              href="/partner-login"
              className="btn btn-secondary md:px-4 px-3 py-3 focus:outline-none w-full"
            >
              Login
            </a>

          </div>
        </div>
      </div>

    </header>
  );
}
