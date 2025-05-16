import React from 'react'
import { useTranslation } from 'react-i18next';

const coreValue = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className='container md:px-0 px-4'>
                <div className='pt-10 mb-10 '>
                    <h2 className='text-3xl sm:text-4xl text-primary font-normal heading-title color-green'
                        dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}
                    >
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 -mx-3">
                        {sectionData && sectionData?.blocks?.map((block: any, index: any) => (
                            <div key={index} className="bg-white rounded-lg p-6 mt-4 shadow-sm">
                                <div className="">
                                    <img src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.featuredimage}`} alt={block?.alt} className="" />
                                    <h3 className="mt-4 mb-2 text-xl sm:text-2xl font-medium">{i18n.language === 'en' ? block?.title : block?.title_urdu}</h3>
                                    <p className='text-base' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default coreValue;
