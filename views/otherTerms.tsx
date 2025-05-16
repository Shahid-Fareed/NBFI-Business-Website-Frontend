import React from 'react'
import { useTranslation } from 'react-i18next';

const otherTerms = ({ sectionData }: any) => {
    const { i18n } = useTranslation();

    return (
        <div className='container px-4 sm:px-0 py-8'>
            <h2 className='text-3xl sm:text-4xl heading-title mb-4' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}>
            </h2>
            <div>
                <h3 className='text-xl sm:text-2xl font-semibold' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.subtitle : sectionData?.subtitle_urdu }}></h3>
                <p className='text-base' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}></p>
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5'>
                {sectionData.blocks.map((items:any, index:any) => (
                    <div key={items?.id} className='bg-[#DCE3F2] p-6'>
                        <h3 className='text-xl sm:text-2xl font-semibold' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.title : items?.title_urdu }}></h3>
                        <p className='text-base' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.description : items?.description_urdu }}></p>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default otherTerms
