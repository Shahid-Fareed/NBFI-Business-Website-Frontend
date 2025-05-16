import React from 'react'
import { useTranslation } from 'react-i18next';

const advisoryPhilosophy = ({sectionData}:any) => {
  const { i18n } = useTranslation();
  return (
    <>
    <div className="container mx-auto py-8 md:px-0 px-4">
    <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
        <div>
            <img className='w-full h-full object-cover' src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`} alt={sectionData?.alt}  />
        </div>
        <div className='p-5 sm:p-10 flex flex-col justify-center  bg-awtgreen'>
            <h2 className='text-3xl sm:text-4xl text-white mb-3 heading-title' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}}></h2>
            <p className='text-white text-base font-normal' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description}}></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default advisoryPhilosophy
