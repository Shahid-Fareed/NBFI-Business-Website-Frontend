import React from 'react'
import { useTranslation } from 'react-i18next';

const investmentBasic = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <div className='container px-4 sm:px-0 py-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div>
                    <img
                        className="w-auto lg:w-full h-full object-cover"
                        src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
                        alt="title"
                    />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-center bg-primary">
                    <h2 className="text-3xl md:text-4xl text-white" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}>
                    
                    </h2>
                    <h2 className="text-xl md:text-2xl text-white mb-4 font-normal" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.subtitle : sectionData?.subtitle_urdu }}>
                    
                    </h2>
                    <p className="text-base text-white" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}>
                    
                    </p>
                </div>
            </div>
            {sectionData.blocks.map((items:any, index:any)=>(
            <div key={items.id} className='bg-[#DCE3F2] p-6'>
                <h3 className='text-2xl font-semibold mb-3' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.title : items?.title_urdu}}></h3>
                <p className='' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? items?.description : items?.description_urdu}}></p>
            </div>
        ))}
        </div>

    )
}

export default investmentBasic
