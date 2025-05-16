"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';



const innerBanner = ({ title, titleUrdu, subtitle, subtitle_urdu, imageUrl }:any) => {
    const { i18n } = useTranslation();
    const isRTL: boolean = i18n.language === 'ur';
    return (
        <>
            <div className="px-4 md:px-0 pb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Text Content */}
                    <div className={` flex-1 ${isRTL ? 'lg:text-right  ' : 'lg:text-left '}`}>
                        <h3 className="text-base text-awtgreen font-semibold">
                        { i18n.language === 'en' ? subtitle : subtitle_urdu }
                        </h3>
                        <h1 className="text-4xl text-primary page-title"  style={{wordBreak: 'break-all'}} dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? title : titleUrdu }}>
                            
                        </h1>
                    </div>

                    {/* Image Content */}
                    <div className="flex-1 mt-6 md:mt-0">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_Image_Path}/filescategory_images/${imageUrl}`}
                            alt={title}
                            className="w-full"
                            width='650'
                            height='370'
                            priority
                        />
                    </div>
                </div>
            </div>


        </>
    )
}

export default innerBanner
