'use client';
import React, { FC, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from "next/link";
import Image from 'next/image';

const Banner: FC = ({ sliders }: any) => {
  const { t, i18n } = useTranslation();
  const isRTL: boolean = i18n.language === 'ur';
  const [showAllSlides, setShowAllSlides] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAllSlides(true);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const visibleSlides = showAllSlides ? sliders : sliders?.slice(0, 1);

  return (
    <div className={`z-[-100] ${!isRTL ? 'pagination-left' : 'pagination-right'}`}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        grabCursor={false}
        keyboard={{ enabled: false }}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        allowTouchMove={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Navigation, Pagination]}
        dir={isRTL ? 'rtl' : 'ltr'}
        key={isRTL}
        className="mySwiper"
        initialSlide={0}
      >
        {visibleSlides && visibleSlides.map((slides: any, index: any) => (
          <SwiperSlide key={index}>
            <div className={`w-[100%] flex flex-col-reverse lg:flex-row justify-between items-center gap-8 pb-20 md:pb-0`}>
              <div className={`space-y-4 px-4 lg:w-1/2 text-center ${isRTL ? 'lg:text-right md:pr-[7%]' : 'lg:text-left md:pl-[7%]'}`}>
                <h2 className="text-[#303030] font-semibold text-3xl lg:text-6xl">
                  {i18n.language === 'en' ? slides?.title : slides?.title_urdu}
                </h2>
                <p className="text-black py-3 text-md lg:text-xl" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? slides?.description : slides?.description_urdu }} />
                <Link href={slides?.button_url} className={`inline-flex w-fit bg-white text-primary border border-primary rounded-md px-4 py-2 items-center ${isRTL ? 'ml-auto' : 'mr-auto'}`}>
                  <span className="mr-3">{i18n.language === 'en' ? slides?.button_text : slides?.buttontext_urdu}</span>
                  <img src="/assets/Vector.png" alt="Investor Icon" />
                </Link>
              </div>
              <div className="w-full lg:w-1/2 flex justify-end">
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_Path}/sliders_image/${slides?.featuredimage}`}
                  alt={i18n.language === 'en' ? slides?.title : slides?.title_urdu}
                  className="max-w-full h-auto"
                  width={675}
                  height={475}
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
