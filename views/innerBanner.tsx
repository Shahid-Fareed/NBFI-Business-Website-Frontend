import React from 'react'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const innerBanner = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    const isRTL: boolean = i18n.language === 'ur';
    return (
        <>
            <div className='container mx-auto md:px-0 px-4'>
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 items-center justify-between mb-8">
                    {/* Text Content */}
                    <div className={` flex-1 ${isRTL ? 'lg:text-right  ' : 'lg:text-left '}`}>
                        <h3 className="text-base text-awtgreen font-semibold">{i18n.language === 'en' ? sectionData?.subtitle : sectionData?.subtitle_urdu}</h3>
                        <h1 className="text-3xl page-title md:text-5xl text-primary " style={{
                            fontSize: window.innerWidth >= 768 ? '48px' : '30px',
                            lineHeight: window.innerWidth >= 768 ? '52px' : '34px',
                            wordBreak: 'break-all',
                            
                        }}
                            dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}
                        >
                            {/* <span className='font-semibold text-awtgreen'></span> */}
                        </h1>
                    </div>

                    {/* Image Content */}
                    <div className="flex-1 mt-8 md:mt-0">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
                            alt={sectionData?.alt}
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
