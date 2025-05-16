import React from 'react'
import { useTranslation } from 'react-i18next';

const textwithImage = ({sectionData}:any) => {
    const { i18n } = useTranslation();
    
    return (
        <div className='container px-4 sm:px-0 py-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
                <div className=''>
                    <p className='text-base' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}>
                        
                    </p>
                </div>
                <div className=''>
                    <img src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`} alt={sectionData.title} className='object-cover w-full' />
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10'>
                {sectionData.blocks.map((item:any, index:any)=>(

                
                <div key={item.id} className='p-5 bg-white border border-[#D7D7D7]'>
                    <p dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? item?.description : item?.description_urdu }}></p>
                </div>
            ))}

            </div>
        </div>
    )
}

export default textwithImage
