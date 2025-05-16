"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';



const innerBanner = ({ title, titleUrdu, subtitle, subtitle_urdu, imageUrl }:any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className="px-4 md:px-0">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h3 className="text-base text-awtgreen font-semibold">
                        { i18n.language === 'en' ? subtitle : subtitle_urdu }
                        </h3>
                        <h1 className="text-4xl text-primary" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? title : titleUrdu }}>
                            
                        </h1>
                    </div>

                    {/* Image Content */}
                    <div className="flex-1 mt-6 md:mt-0">
                        <img
                            src={`${process.env.NEXT_PUBLIC_Image_Path}/product_images/${imageUrl}`}
                            alt={title}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>


        </>
    )
}

export default innerBanner
