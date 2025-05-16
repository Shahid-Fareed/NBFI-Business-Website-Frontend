import React from 'react'
import { useTranslation } from 'react-i18next';


const mainIntro = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    // const isRTL: boolean = i18n.language === 'ur';

    return (
        <>
            <div className='container mx-auto md:px-0 px-4 py-8'>
                <div className=''>
                    <h2 className='text-3xl sm:text-4xl text-black heading-title color-green mb-4' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                    <p className='text-base' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}></p>
                    {sectionData?.featuredimage?.length > 0 ? <img
                        src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
                        alt={sectionData?.alt}
                        className="w-full py-4"
                    />: '' }
                    {/* <img
                        src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
                        alt={sectionData?.alt}
                        className="w-full py-4"
                    /> */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                        {sectionData && sectionData?.blocks?.map((block: any, index: any) => {
                            return (
                                <div key={index} className=''>
                                    <h2 className={`text-3xl sm:text-4xl font-semibold text-black mb-4`}>
                                        {i18n.language === 'en' ? block?.title : block?.title_urdu}
                                    </h2>
                                    <p className="text-black text-base"
                                        dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}
                                    ></p>
                                </div>
                            )
                        }
                        )}

                    </div>

                </div>
            </div>
        </>
    )
}

export default mainIntro
