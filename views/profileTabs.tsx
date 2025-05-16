"use client";
import React, { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";

const ProfileTabs = ({ page }: any) => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(page?.title || "Default Tab");
  
  
  

  const pagesTab = [
    {
      "title": "Company Profile",
      "title_urdu": "کمپنی کا پروفائل",
      "slug": "company-profile"
    },
    {
      "title": "Sponsor's Profile",
      "title_urdu": "اسپانسر کا پروفائل",
      "slug": "sponsors-profile"
    },
    {
      "title": "Director’s Profile",
      "title_urdu": "ڈائریکٹر کا پروفائل",
      "slug": "directors-profile"
    },
    {
      "title": "Management Profile",
      "title_urdu": "مینجمنٹ پروفائل",
      "slug": "management-profile"
    },
    {
      "title": "Other Information",
      "title_urdu": "دیگر معلومات",
      "slug": "other-information"
    },
  ]

  if (!pagesTab || pagesTab.length === 0) {
    return <p>No Page Available</p>;
  }

  useEffect(() => {
    const currentTab = pagesTab.find(tab => tab.title === page?.title);
    if (currentTab) {
      setActiveTab(currentTab.title);
    }
  }, [page?.title]); // Re-run when page.title changes

  

  return (
    <div className="container md:px-0 px-4" style={{ paddingTop: '40px' }}>
      <div className="flex flex-wrap justify-center md:justify-start gap-6 border-b-4 border-gray-200 mb-4 relative">
        <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
          <span className="w-4 h-1 bg-primary text-primary"></span>
          <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
          <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
        </div>
        {pagesTab?.map((tab: any, index: any) => (
          <Link
            href={tab.slug}
            key={tab?.title || index}

            className={`py-2 -mb-1 text-md md:text-xl transition-colors duration-300 bg-transparent border-0 rounded-none text-primary hover:text-primary hover:border-b-4 hover:border-primary focus:outline-none ${activeTab === tab.title
              ? " border-b-4 border-b-primary"
              : "hover:border-b-primary"
              }`}
          // onClick={() => setActiveTab(tab?.title)}
          >
            {i18n.language === "en" ? tab?.title : tab?.title_urdu}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
