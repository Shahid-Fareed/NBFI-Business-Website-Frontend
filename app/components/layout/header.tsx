"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa"; // Import search icon
import "@/i18n";
import Link from "next/link";
import axios from 'axios';
import Image from "next/image";
import useOutsideClick from "@/app/hooks/useOutsideClick";

const Header: FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [footerData, setFooterData] = useState([] as any);
  const { t, i18n } = useTranslation();
  const [headerMenu, setHeaderMenu] = useState([] as any);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); // State to track open mega menu
  const menuRef = useRef(null);


  useOutsideClick(menuRef, () => {
    setOpenMenuId(null);
  });

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const currentLanguage: string = i18n.language || "en";
    document.documentElement.dir = currentLanguage === "ur" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both APIs in parallel
        const [footerResponse, headerResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontsettings`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontheadermenu`),
        ]);

        // Set state after both requests complete
        setFooterData(footerResponse.data[0]);
        setHeaderMenu(headerResponse.data);
      } catch (error) {
        console.error("Error fetching layout data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleMegaMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };


  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  // Function to handle clicks outside the search box
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    

    // Attach event listener when the search is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <header className="bg-primary text-white">
      <div className="container mx-auto py-2 px-4 md:px-0 flex justify-between items-center text-sm">
        <span>{i18n.language === 'en' ? footerData?.tagline : footerData?.tagline_urdu}</span>
        <div className="space-x-4 flex items-center">
          <ul className="hidden sm:flex items-center space-x-4 divide-x divide-white">
            <li className="pr-4">
              <Link href="/daily-nav" className="text-white hover:text-gray-300">
                {t("dailyNavv")}
              </Link>
            </li>
            <li className="px-4">
              <Link href="/how-to-invest" className="text-white hover:text-gray-300">
                {t("howToInvest")}
              </Link>
            </li>
            <li className="px-4">
              <Link href="/faqs" className="text-white hover:text-gray-300">
                {t("faq")}
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/contact" className="text-white hover:text-gray-300">
                {t("contactUs")}
              </Link>
            </li>
          </ul>
          <div className="relative">
            <select
              className="bg-white text-primary px-3 py-1 rounded font-semibold"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white text-primary bg-gradient-to-r from-[#f5f7ff] via-[#fbfff8] to-[#fffcf6] relative">
        <div className="container mx-auto py-3 px-4 md:px-0 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Image
                  src='/assets/AWTIL-Logo.png'
                  alt="Logo"
                  width={80}
                  height={100}
                  className="h-[100px] w-[80px] sm:h-20 sm:w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            <nav className="hidden lg:flex gap-6" ref={menuRef}>
              {headerMenu ? headerMenu.map((parentmenu: any) => (
                parentmenu.featuredimage?.length > 0 ? (
                  <div className="mega-menu" key={parentmenu.id}>
                    <Link href={parentmenu.url} onClick={() => toggleMegaMenu(parentmenu.id)} className="hover:text-primary flex font-normal items-center space-x-1">
                      <span>{i18n.language === 'en' ? parentmenu.title : parentmenu.title_urdu}</span>
                      {/* Show dropdown icon if menu has children */}
                      {parentmenu.children?.length > 0 && <FaChevronDown className={`w-3 h-3 transition-transform ${openMenuId === parentmenu.id ? "rotate-180" : ""}`} />}
                    </Link>

                    {parentmenu.children?.length > 0 && openMenuId === parentmenu.id && (
                      <div className="absolute left-0 top-full bg-white border-t w-full shadow-lg z-10">
                        <div
                          className={`top-[70px] bg-white border-t w-full shadow-lg z-10 
                         max-h-[400px] overflow-hidden`}
                        >
                          <div className="relative w-full">
                            <div className="w-full grid grid-cols-3 gap-2 absolute right-0 top-0">
                              <span className="w-full h-[2px] bg-awtgreen text-awtgreen"></span>
                              <span className="w-full h-[2px] bg-[#946B29] text-[#946B29]"></span>
                              <span className="w-full h-[2px] bg-primary text-primary"></span>
                            </div>
                          </div>
                          <div className="container mx-auto flex flex-wrap items-center">
                            <div className="w-full sm:w-2/3 p-4">
                              <div className="grid grid-cols-2 gap-5">
                                {parentmenu.children?.map((submenu: any) =>
                                (submenu.children && submenu.children.length > 0 ? (
                                  <div key={submenu.id}>
                                    {/* Show h4 only if submenu has nested children */}
                                    <h4 className="font-semibold pb-2 mb-2 border-b-4">
                                      {i18n.language === 'en' ? submenu.title : submenu.title_urdu}
                                    </h4>
                                    <ul className="space-y-2">
                                      {submenu.children.map((menu: any) => (
                                        <li key={menu.id}>
                                          <Link href={menu.url} onClick={() => toggleMegaMenu(null)} className="hover:text-primary">
                                            {i18n.language === 'en' ? menu.title : menu.title_urdu}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : (
                                  // Directly list the menu items if there are no nested children
                                  <div key={submenu.id}>
                                    <ul className="space-y-2">
                                      <li>
                                        <Link href={submenu.url} onClick={() => toggleMegaMenu(null)} className="hover:text-primary">
                                          {i18n.language === 'en' ? submenu.title : submenu.title_urdu}
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                ))
                                )}
                              </div>
                            </div>

                            <div className="w-full lg:w-1/3 p-4 flex justify-center items-center">
                              <img
                                src={`${process.env.NEXT_PUBLIC_Image_Path}/menu_images/${parentmenu?.featuredimage}`}
                                alt={i18n.language === 'en' ? parentmenu.title : parentmenu.title_urdu}
                                className="max-w-full rounded shadow"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="group" key={parentmenu.id}>
                    <Link href={parentmenu.url} className="hover:text-primary flex items-center space-x-1">
                      <span>{i18n.language === 'en' ? parentmenu.title : parentmenu.title_urdu}</span>
                      {/* Show dropdown icon if menu has children */}
                      {parentmenu.children?.length > 0 && (
                        <FaChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                      )}
                    </Link>
                    {parentmenu.children?.length > 0 && (
                      <div className={`absolute ${i18n.language === "ur" ? "right-0" : "left-0"
                        } top-full bg-white shadow-lg hidden group-hover:flex flex-wrap z-10 lg:w-[900px] p-6 max-h-[400px] overflow-y-auto`}>
                        {parentmenu.children?.map((submenu: any) =>
                        (submenu.children && submenu.children.length > 0 ? (
                          <div key={submenu.id}>
                            {/* Show h4 only if submenu has nested children */}
                            <h4 className="font-semibold pb-2 mb-2 border-b-4">
                              {i18n.language === 'en' ? submenu.title : submenu.title_urdu}
                            </h4>
                            <ul className="space-y-2">
                              {submenu.children.map((menu: any) => (
                                <li key={menu.id}>
                                  <Link href={menu.url} className="hover:text-primary">
                                    {i18n.language === 'en' ? menu.title : menu.title_urdu}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          // Directly list the menu items if there are no nested children
                          <div key={submenu.id}>
                            <ul className="space-y-2">
                              <li>
                                <Link href={submenu.url} className="hover:text-primary">
                                  {i18n.language === 'en' ? submenu.title : submenu.title_urdu}
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ))
                        )}
                      </div>
                    )}
                  </div>
                )
              )) : null}
            </nav>
          </div>

          <div className="flex gap-3 sm:gap-5">
            {/* Search code start  */}
            <div className="relative flex items-center" ref={searchRef}>
              {/* Search Icon */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                
                className={`${isOpen ? "hidden " : ""} p-2 sm:p-3 bg-[#946B29] rounded transition`}
              >
                <FaSearch className="text-xl sm:text-2xl text-white" />
              </button>

              {/* Search Input with Smooth Transition */}
              <div
                className={`absolute right-0 -top-[2px] sm:top-0 items-center transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 w-48 sm:w-64 ml-2" : "opacity-0 w-0 overflow-hidden"
                  }`}
                style={{ zIndex: 10 }}
              >
                <form
                  onSubmit={handleSearch}
                  className="flex items-center justify-between bg-white border p-1 sm:p-2 rounded shadow-md"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-sm p-1 border-none outline-none w-4/5  sm:w-full transition-all duration-300"
                  />
                  {/* <button type="submit" className="bg-transparent">
                    
                  </button> */}
                  <button type="submit" className="p-1 bg-awtgreen text-white rounded text-sm">
                    Go
                  </button>
                </form>
              </div>
            </div>
            {/* Search code end */}

            <Link
              rel="stylesheet"
              href="https://einvest.awtinvestments.com/"
              className="hidden font-normal lg:flex text-white bg-awtgreen border border-awtgreen rounded-md px-4 py-2 items-center"
            >
              <span className="mr-3">Investor Login</span>
              <img
                src="/assets/Investor-icon-white.png"
                className="h-7"
                alt="Investor Icon"
              />
            </Link>
          

          <button
            className="lg:hidden text-white bg-secondary focus:outline-none p-1 rounded-md"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white text-primary p-4 space-y-4">
            {headerMenu ? headerMenu.map((parentmenu: any) => (
              <div className="group relative" key={parentmenu.id}>
                <Link
                  href={parentmenu.url}
                  className="hover:text-primary flex items-center space-x-1"
                  onClick={() => toggleMegaMenu(parentmenu.id)} // Toggle mega menu
                >
                  <span>{i18n.language === 'en' ? parentmenu.title : parentmenu.title_urdu}</span>
                  {parentmenu.children?.length > 0 && (
                    <FaChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {parentmenu.children?.length > 0 && openMenuId === parentmenu.id && (
                  <div className={`absolute ${i18n.language === "ur" ? "right-0" : "left-0"} top-full bg-white text-primary shadow-lg flex-wrap z-10 max-h-[400px] overflow-y-auto`}>
                    <div className="relative w-full">
                      <div className="w-full grid grid-cols-3 gap-2 absolute right-0 top-0">
                        <span className="w-full h-1 bg-awtgreen text-awtgreen"></span>
                        <span className="w-full h-1 bg-[#946B29] text-[#946B29]"></span>
                        <span className="w-full h-1 bg-primary text-primary"></span>
                      </div>
                    </div>
                    <div className="w-full p-4">
                      <div className="gap-3 space-y-2">
                        {parentmenu.children?.map((submenu: any) => (
                          submenu.children && submenu.children.length > 0 ? (
                            <div key={submenu.id}>
                              <h4 className={`font-semibold pb-2 mb-2 border-b-4`}>
                                {i18n.language === 'en' ? submenu.title : submenu.title_urdu}
                              </h4>
                              <ul className="space-y-2">
                                {submenu.children?.map((menu: any) => (
                                  <li key={menu.id}>
                                    <Link href={menu.url} className="hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                                      {i18n.language === 'en' ? menu.title : menu.title_urdu}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div key={submenu.id}>
                              <ul className="space-y-2">
                                <li>
                                  <Link href={submenu.url} className="hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                                    {i18n.language === 'en' ? submenu.title : submenu.title_urdu}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          )
                        ))}
                      </div>
                    </div>

                    <div className="w-full p-4 flex justify-center items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_Image_Path}/menu_images/${parentmenu?.featuredimage}`}
                        alt={i18n.language === 'en' ? parentmenu.title : parentmenu.title_urdu}
                        className="max-w-full rounded shadow"
                      />
                    </div>
                  </div>
                )}
              </div>
            )) : null}
            <Link rel="stylesheet" href="https://einvest.awtinvestments.com/" className="w-full font-normal flex text-white bg-awtgreen border border-awtgreen rounded-md px-4 py-3 items-center justify-center">
              <span className="mr-3">{t("investorLogin")}</span>
              <img
                src="/assets/Investor-icon-white.png"
                className="h-7"
                alt="Investor Icon"
              />
            </Link>
          </div>
        )}
      </div>
    </header>


  );
};

export default Header;