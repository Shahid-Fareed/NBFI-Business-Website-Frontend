"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';

const productBenefit = ({benefits}:any) => {
    const { i18n } = useTranslation();
    return (
        <div className="container px-4 sm:px-0">
            <div className="bg-awtgreen p-7 sm-p-20 my-8 grid grid-cols-1 gap-10 items-center">
                <div>
                    <h2 className="text-white text-base heading-title mb-3" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? benefits?.subtitle : benefits?.subtitle_urdu }}>
                        
                    </h2>
                    <h2 className="text-3xl sm:text-4xl text-white mb-3 heading-title" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? benefits?.title : benefits?.title_urdu }}>
                        
                    </h2>
                    <p className="text-white text-base font-normal !text-left" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? benefits?.description : benefits?.description_urdu }}>
                        
                    </p>
                </div>
            </div>
        </div>
    )
}

export default productBenefit
