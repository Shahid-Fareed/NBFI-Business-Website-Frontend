"use client";
import React, { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const ProfileTabs = ({ page }: any) => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(page?.title || "Default Tab");
  const [trustdeedData, setTrustDeed] = useState([] as any);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontdownload/trust-deed`)
      .then((response) => {
        const apiData = response.data;
        setTrustDeed(apiData);

      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const pagesTab = [
    {
      "title": "Trust Deeds",
      "title_urdu": "ٹرسٹ ڈیڈز",
      "slug": "/downloads/trust-deed"
    },
    {
      "title": "Offering Documents",
      "title_urdu": "دستاویزات کی پیشکش",
      "slug": "downloads/offering-documents"
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
    <div className="container md:px-0 px-4" style={{ paddingTop: '20px' }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">

        <div className="bg-awtgreen p-6 ">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-base text-white font-semibold" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? "Trust Deed" : "ٹرسٹ ڈیڈز" }}>
              </h3>
            </div>
            <Link href={`/downloads/trust-deed`}>
              <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
            </Link>
          </div>
        </div>

        <div  className="bg-primary p-6 ">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-base text-white font-semibold" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? "Offering Document" : "دستاویزات کی پیشکش" }}>
              </h3>
            </div>
            <Link href={`/downloads/offering-documents`}>
              <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
            </Link>
          </div>
        </div>

        <div  className="bg-[#946B29] p-6 ">
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-base text-white font-semibold" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? "Other Documents" : "دیگر دستاویزات" }}>
              </h3>
            </div>
            <Link href={`/downloads/other-documents`}>
              <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileTabs;
