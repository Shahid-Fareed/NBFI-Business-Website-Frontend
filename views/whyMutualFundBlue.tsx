import React from 'react'
import { useTranslation } from 'react-i18next';

const whyMutualFund = ({ sectionData }: any) => {
    const { i18n } = useTranslation();

    return (
        <div className='container px-4 sm:px-0 py-8'>
            <div className='bg-primary p-10'>
                <h2 className='text-3xl sm:text-4xl text-white mb-3 heading-title' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-10'>
                    {sectionData.blocks.map((items:any, index:any) => (
                        <div key={items?.id} className='relative p-4'>
                            <h3 className='text-9xl font-semibold text-white opacity-10 absolute left-0 -top-5' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.subtitle : items?.subtitle_urdu }}></h3>
                            <h3 className='text-white text-xl font-medium' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.title : items?.title_urdu }}></h3>
                            <p className='text-white text-sm' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.description : items?.description_urdu }}>
                            </p>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default whyMutualFund
