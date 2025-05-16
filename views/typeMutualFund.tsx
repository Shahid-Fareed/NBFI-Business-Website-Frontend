import React from 'react'
import { useTranslation } from 'react-i18next';

const typeMutualFund = ({sectionData}:any) => {
    const { i18n } = useTranslation();

    return (
        <div className='container px-4 sm:px-0 py-8 '>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 bg-[#EEF2EE] p-6 items-center'>
                <div className=''>
                    <img src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`} alt='Image Description' className='object-cover w-full' />
                </div>
                <div className=''>
                    <h2 className='text-3xl sm:text-4xl heading-title color-green' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                    <p className='text-base mt-4' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default typeMutualFund
