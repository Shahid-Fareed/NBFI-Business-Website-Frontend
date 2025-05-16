"use client";
import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useTranslation } from "react-i18next";

const SinglePost = ({ data }: any) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = () => {
    const fullImageUrl = `${process.env.NEXT_PUBLIC_Image_Path}/blogs_image/${data?.featuredimage}`;
    setCurrentImage(fullImageUrl);
    setIsOpen(true);
  };

  return (
    <div style={{ backgroundImage: "url('/assets/background-repeat1.png')" }}>
      <div
        style={{
          background:
            "linear-gradient(to right, rgb(245 247 255 / 92%), rgb(251 255 248 / 92%), rgb(255 252 246 / 92%))",
          zIndex: -1,
        }}
      >
        <div className="container px-4 md:px-0 pt-5 pb-16">
          <div className="relative mb-7">
            <div
              className="relative w-full rounded-lg overflow-hidden cursor-pointer"
              onClick={handleImageClick} // ✅ Corrected function call
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_Path}/blogs_image/${data?.featuredimage}`}
                alt="banner"
                className="h-[400px] w-full object-contain"
                width={1280}
                height={200}
              />
            </div>
            <div className="flex gap-5 items-center absolute bottom-0 left-0">
              <div className="px-2 py-4 min-w-fit text-sm bg-awtgreen text-white">
                <p className="text-xs">
                  {new Date(data.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="sm:text-3xl font-semibold">
                  {new Date(data.date).getFullYear()}
                </h3>
              </div>
            </div>
          </div>

          <h3 className="sm:text-md text-awtgreen font-medium">{data.category}</h3>
          <h3
            className="text-3xl sm:text-4xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: i18n.language === "en" ? data?.title : data?.title_urdu,
            }}
          ></h3>

          <p
            className="pt-3"
            dangerouslySetInnerHTML={{
              __html: i18n.language === "en" ? data?.description : data?.description_urdu,
            }}
          ></p>
        </div>

        {/* Lightbox for single image */}
        {isOpen && (
          <Lightbox mainSrc={currentImage} onCloseRequest={() => setIsOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default SinglePost;
