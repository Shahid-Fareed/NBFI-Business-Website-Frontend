"use client";

import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Banner: FC = () => {
    const { t, i18n } = useTranslation();
    const isRTL: boolean = i18n.language === 'ur';

    return (
        <>
            <div className={`z-[-100]  ${!isRTL ? 'pagination-left' : 'pagination-right'}`}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    grabCursor={true}
                    keyboard={{ enabled: true }}
                    pagination={{
                        clickable: true,
                        type: 'bullets',
                    }}
                    speed={1000}
                    modules={[Navigation, Pagination]}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    key={isRTL}
                    className="mySwiper"
                    initialSlide={0}
                >
                    <SwiperSlide>
                        <div className={`w-[100%] flex flex-col-reverse lg:flex-row justify-between items-center lg:justify-between gap-8 lg:gap-12 pb-20 md:pb-0 `}>
                            <div className={`space-y-4 px-4 lg:w-1/2 text-center  ${isRTL ? 'lg:text-right md:pr-[7%] ' : 'lg:text-left md:pl-[7%]'}`}>
                                <h2 className="text-[#303030] font-semibold text-3xl lg:text-6xl">
                                    {t('banner.awt')}
                                    <br />
                                    {t('banner.investmentsLimited')}
                                </h2>
                                <p className="text-black py-3 text-md lg:text-xl">
                                    {t('banner.description')}
                                </p>
                                <button className={`hidden lg:flex bg-white text-primary border border-primary rounded-md px-4 py-2 items-center ${isRTL ? 'ml-auto ' : 'mr-auto'}`}>
                                    <span className="mr-3">{t('banner.getInTouch')}</span>
                                    <img src="/assets/Vector.png" className="" alt="Investor Icon" layout="intrinsic"/>
                                </button>
                            </div>

                            <div className="w-full lg:w-1/2 flex justify-end">
                                <img src="/assets/banner img.png" alt={t('banner.bannerAlt')} className="max-w-full h-auto" />
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className=" w-[100%] flex flex-col-reverse lg:flex-row justify-between items-center lg:justify-between gap-8 lg:gap-12 pb-20 md:pb-0 ">
                            <div className={`space-y-4 px-4 lg:w-1/2 text-center  ${isRTL ? 'lg:text-right  md:pr-[7%]' : 'lg:text-left  md:pl-[7%]'}`}>
                                <h2 className="text-[#303030] font-semibold text-3xl lg:text-6xl">
                                    {t('banner.awtt')}
                                    <br />
                                    {t('banner.investmentsLimitedd')}
                                </h2>
                                <p className="text-black py-3 text-md lg:text-xl">
                                    {t('banner.descriptionn')}
                                </p>
                                <button className="hidden lg:flex bg-white text-primary border border-primary rounded-md px-4 py-2 items-center mx-auto lg:mx-0">
                                    <span className="mr-3">{t('banner.getInTouchh')}</span>
                                    <img src="/assets/Vector.png" className="" alt="Investor Icon" layout="intrinsic" />
                                </button>
                            </div>

                            <div className="w-full lg:w-1/2 flex justify-end">
                                <img src="/assets/banner img.png" alt={t('banner.bannerAlt')} className="max-w-full h-auto" />
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default Banner;