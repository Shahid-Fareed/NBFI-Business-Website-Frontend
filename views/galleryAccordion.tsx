"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useTranslation } from 'react-i18next';

const GallaryAccordion = () => {

  const { i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null); // Track which section is open
  const [isOpen, setIsOpen] = useState(false); // Lightbox state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track selected image index
  const [currentImages, setCurrentImages] = useState([]); // Store images of the selected block
  const [galleryData, setGalleryData] = useState([] as any);
  

  const handleToggle = (index: any) => {
    setOpenIndex(index === openIndex ? null : index); // Close if clicked again
  };

  const handleImageClick = (imageArray: any, index: any) => {
    const fullImageUrls = imageArray.map((img: any) => `${process.env.NEXT_PUBLIC_Image_Path}/gallery_image/${img}`);
    setCurrentImages(fullImageUrls);
    setCurrentImageIndex(index);
    setIsOpen(true);
  };


  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontgallery`)
      .then((response) => {
        const apiData = response.data;
        console.log(apiData);
        setGalleryData(apiData);

      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const bgColors = ["bg-awtgreen text-white", "bg-[#946B29] text-white", "bg-primary text-white"]; // Define colors
  return (

    <div className="container mx-auto md:px-0 px-4">
      {/* <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1> */}
      <div className="space-y-2 divide-y-2">
        {galleryData.map((gallerydata: any, index: any) => {
          const bgColor = bgColors[index % bgColors.length]; // Correct placement of color selection

          return (
            <div key={index} className="py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <span className="flex gap-5 items-center text-lg font-medium text-black relative">
                  <div className="flex gap-5 items-center">
                    <div className={`px-2 py-2 min-w-fit text-sm ${bgColor}`}>
                      <p className="text-xs">{new Date(gallerydata.date).toLocaleDateString("en-US", { day: "numeric", month: "short" }).split(" ").reverse().join(" ")}</p>
                      <h3 className="sm:text-xl font-semibold">{new Date(gallerydata.date).getFullYear()}</h3>
                    </div>
                  </div>
                  {gallerydata.title}
                </span>
                <span>
                  {openIndex === index ? (
                    <img src="/assets/faqarrowdown.png" alt="Arrow Down" />
                  ) : (

                    <img src="/assets/faqarrowup.png" alt="Arrow Up" />
                  )}
                </span>
              </div>
              {openIndex === index && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5">
                  {gallerydata.gallery.map((src: any, srcIndex: any) => (
                    <div
                      key={srcIndex}
                      className="relative w-full h-64 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(gallerydata.gallery, srcIndex)}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_Image_Path}/gallery_image/${src}`}
                        alt={gallerydata.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <Lightbox
          mainSrc={currentImages[currentImageIndex]}
          nextSrc={currentImages[(currentImageIndex + 1) % currentImages.length]}
          prevSrc={currentImages[(currentImageIndex + currentImages.length - 1) % currentImages.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setCurrentImageIndex((currentImageIndex + currentImages.length - 1) % currentImages.length)
          }
          onMoveNextRequest={() =>
            setCurrentImageIndex((currentImageIndex + 1) % currentImages.length)
          }
        />
      )}
    </div>
  );
};

export default GallaryAccordion;
