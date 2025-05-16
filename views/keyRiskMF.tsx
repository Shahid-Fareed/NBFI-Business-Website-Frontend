import React from 'react'
import { useTranslation } from 'react-i18next';

const keyRiskMF = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <div className='bg-[#DCE3F2] w-full py-8 my-8'>
            <div className='container px-4 sm:px-0'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
                    <div className=''>
                        <img src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`} alt='Image Description' className='object-cover w-full' />
                    </div>
                    <div className=''>
                        <h2 className='text-3xl sm:text-4xl heading-title' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                        <p className='text-base mt-4' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}>
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6'>
                    {sectionData.blocks.map((items:any, index:any) => (
                        <div key={index}>
                            <h3 className='text-xl sm:text-2xl heading-title' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.title : items?.title_urdu }}></h3>
                            <p dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.description : items?.description_urdu }}>
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default keyRiskMF
