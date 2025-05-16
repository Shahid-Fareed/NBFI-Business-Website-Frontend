"use client";

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import img from 'next/img';

const AwtUpdates: FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL: boolean = i18n.language === 'ur';

  return (
    <>
      <div className="py-16">
        <div className="container mx-auto md:px-0 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h2 className="text-sm text-awtgreen mb-4">
                {t('awtUpdates.title')}
              </h2>
              <h2 className="text-3xl sm:text-4xl text-black mb-4" dangerouslySetInnerHTML={{ __html: t('awtUpdates.subTitle') }} />
            </div>
            <div className="w-full md:w-1/2 text-start md:text-end">
              <button className="bg-transparent text-awtgreen border border-awtgreen rounded-lg py-2 px-4 md:px-6 hover:bg-awtgreen hover:text-white transition">
                {t('awtUpdates.viewAllUpdates')}
              </button>
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
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center border border-[#CCCCCC] bg-[#FCFCFC] rounded-md p-5">
                <img src="/assets/blog1.png" className="w-full md:w-1/3 mb-4 md:mb-0" />
                <div className="space-y-4 p-7">
                  <h3 className="text-black text-xl" dangerouslySetInnerHTML={{ __html: t('awtUpdates.blog1Title') }} />
                  <p className="text-black">
                    {t('awtUpdates.blog1Description')}
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center border border-[#CCCCCC] bg-[#FCFCFC] rounded-md p-5">
                <img src="/assets/blog1.png" className="w-full md:w-1/3 mb-4 md:mb-0" />
                <div className="space-y-4 p-7">
                  <h3 className="text-black text-xl" dangerouslySetInnerHTML={{ __html: t('awtUpdates.blog2Title') }} />
                  <p className="text-black">
                    {t('awtUpdates.blog1Description')}
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center border border-[#CCCCCC] bg-[#FCFCFC] rounded-md p-5">
                <img src="/assets/blog1.png" className="w-full md:w-1/3 mb-4 md:mb-0" />
                <div className="space-y-4 p-7">
                  <h3 className="text-black text-xl" dangerouslySetInnerHTML={{ __html: t('awtUpdates.blog1Title') }} />
                  <p className="text-black">
                    {t('awtUpdates.blog1Description')}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AwtUpdates;