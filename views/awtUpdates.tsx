"use client";
import React, { FC } from 'react';
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

const AwtUpdates: FC = ({ sectionData, blogs }: any) => {
  const { t, i18n } = useTranslation();
  const [height, setHeight] = useState(window.innerWidth < 768 ? "auto" : "250px");
  const isRTL: boolean = i18n.language === 'ur';

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth < 768 ? "auto" : "250px");
    };

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <div className="py-8">
        <div className="container mx-auto md:px-0 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h2 className="text-base text-awtgreen mb-4">
                {i18n.language === 'en' ? sectionData?.subtitle : sectionData?.subtitle_urdu}
              </h2>
              <h2 className="text-3xl sm:text-4xl text-black mb-4 heading-title" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }} />
            </div>
            <div className="w-full md:w-1/2 text-start md:text-end">
              <a href={sectionData?.button_url} className="bg-transparent text-awtgreen border border-awtgreen rounded-lg py-3 px-4 md:px-6 hover:bg-awtgreen hover:text-white transition text-base font-medium">
                {i18n.language === 'en' ? sectionData?.button_text : sectionData?.button_text_urdu}
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto pt-7 md:px-0 px-4">
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            centeredSlides={false}
            centeredSlidesBounds={true}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2.1,
              },
              1024: {
                slidesPerView: 2.1,
              },
            }}
            scrollbar={{ draggable: false }}
            navigation={false}
            pagination={{
              clickable: true,
            }}
            speed={1000}
            modules={[Navigation]}
            dir={isRTL ? 'rtl' : 'ltr'}
            key={isRTL}
            className="mySwiper"
          >

            {blogs && blogs?.map((blog: any, index: any) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row items-center border border-[#CCCCCC] bg-[#FCFCFC] rounded-md p-5" style={{ height }}>
                  <Link href={`/blog/${blog?.slug}`} style={{display: "contents"}}>
                    <Image
                     src={`${process.env.NEXT_PUBLIC_Image_Path}/blogs_image/${blog?.featuredimage}`} 
                     className="w-full md:w-1/3 mb-4 md:mb-0"
                     alt={blog?.alt}
                     width='189'
                     height='189'
                     priority
                      />
                  </Link>
                  <div className='flex gap-5 items-center absolute  bottom-0 right-0 '>
                    <div className="px-2 py-2 min-w-fit text-sm bg-awtgreen text-white">
                      <p className="text-xs">{new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })}</p>
                      <h3 className="sm:text-xl font-semibold" >{new Date(blog.date).getFullYear()}</h3>
                    </div>
                  </div>
                  <div className="space-y-4 " style={{
                    padding: window.innerWidth >= 768 ? '1.75rem' : '0',
                    paddingTop: window.innerWidth >= 768 ? '0' : '1rem',
                    paddingBottom: window.innerWidth >= 768 ? '1rem' : '2rem',
                  }}>
                    <Link href={`/blog/${blog?.slug}`}>
                      <h3 className="text-black text-xl heading-title" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? blog?.title : blog?.title_urdu }} />
                    </Link>
                    <p className="text-black text-sm"
                      dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? blog?.description : blog?.description_urdu }}
                    >
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AwtUpdates;