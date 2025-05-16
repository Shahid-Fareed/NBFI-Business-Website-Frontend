"use client";
import React, { useMemo, useState, useEffect } from "react";
import Loader from "@/app/components/Loader";
import Link from "next/link";
import Popup from "./Popup";
import Image from "next/image";
import Banner from "@/views/banner";
import { usePathname } from 'next/navigation';



interface ContentProps {
  data: {
    page: any;
    sections: Section[];
    blogs: any;
    nav: any;
    products: any;
    sliders: any;
    tabs: any;
  };
}

interface Section {
  id: string;
  view: string;
  sort_order: number;
}

const Content: React.FC<ContentProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupData, setPopupData] = useState<{ popupimage?: string; popuptext?: string }>({});
  const { page, sections, nav, sliders, products, blogs, tabs } = data;

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (pathname !== "/") return; 
  
    const fetchPopupData = async () => {
      try {
        const response = await fetch("https://backend.awtinvestments.com/api/v1/frontsettings/popup");
        const result = await response.json();
        if (result.popupimage && result.popuptext) {
          setPopupData({
            popupimage: result.popupimage,
            popuptext: result.popuptext,
          });
          setOpenPopup(true);
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
        setPopupData({ popupimage: "", popuptext: "" });
      }
    };
  
    fetchPopupData();
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  

  const sortedSections = useMemo(
    () => [...sections].sort((a, b) => a.sort_order - b.sort_order),
    [sections]
  );

  const filteredSections = useMemo(
    () => [...sections].filter(s => s.view !== "banner").sort((a, b) => a.sort_order - b.sort_order),
    [sections]
  );

  const renderSection = (section: Section, index: number) => {
    if (!section.view) return null;

    const DynamicComponent = React.lazy(() =>
      import(`@/views/${section.view}`).catch(
        () => import("@/app/components/Loader").then((mod) => mod.default)
      )
    );

    const uniqueKey = `${section.id}_${index}`;

    return (
      <React.Suspense key={uniqueKey} fallback={<Loader />}>
        <DynamicComponent
          sectionData={section}
          page={page}
          blogs={blogs}
          products={products}
          navs={nav}
          sliders={sliders}
          tabs={tabs}
        />
      </React.Suspense>
    );
  };

  function hexToRgb(hex: string): string {
    const match = hex.replace("#", "").match(/.{1,2}/g);
    if (match) {
      return match.map((value) => parseInt(value, 16)).join(", ");
    }
    return "0, 0, 0";
  }

  const { pageimage, pagecolor1, pagecolor2, pagecolor3 } = page;
  const defaultGradient =
    "linear-gradient(to right, #f5f7ff, #fbfff8, #fffcf6)";
  const backgroundStyle = useMemo(() => {
    if (pageimage || pagecolor1 || pagecolor2 || pagecolor3) {
      return {
        background: `linear-gradient(to right, rgba(${hexToRgb(
          pagecolor1
        )}, 0.92), rgba(${hexToRgb(pagecolor2)}, 0.92), rgba(${hexToRgb(
          pagecolor3
        )}, 0.92)), url(${process.env.NEXT_PUBLIC_Image_Path
          }/pages_image/${encodeURIComponent(pageimage)})`,
        backgroundPosition: "top center",
        backgroundRepeat: "repeat",
      };
    } else if (pageimage) {
      return {
        background: `url(${process.env.NEXT_PUBLIC_Image_Path}/pages_image/${pageimage})`,
        backgroundPosition: "top center",
        backgroundRepeat: "repeat",
      };
    } else if (pagecolor1 || pagecolor2 || pagecolor3) {
      return {
        background: `linear-gradient(to right, ${pagecolor1}, ${pagecolor2}, ${pagecolor3})`,
      };
    } else {
      return {
        background: defaultGradient,
      };
    }
  }, [pageimage, pagecolor1, pagecolor2, pagecolor3]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }


  return (
    <div style={backgroundStyle} className="pb-14">
      {isHomePage && sliders && sliders.length > 0 && <Banner sliders={sliders} />}
      {filteredSections.map(renderSection)}


      {openPopup && popupData?.popupimage && popupData?.popuptext && (
        <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <div className="h-[100vh] w-full flex items-center justify-center px-4">
            <div className="w-full max-w-[80%] flex justify-center">
              <div className="w-[100%] md:w-[55%]">
                {popupData?.popupimage && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_Image_Path}/settings_images/${popupData?.popupimage}`}
                    alt={popupData.popupimage}
                    className="w-full h-auto "
                    width={712}
                    height={699}
                    priority
                    
                  />
                )}
              </div>
            </div>
          </div>
        </Popup>
      )}

    </div>
  );
};

export default Content;
