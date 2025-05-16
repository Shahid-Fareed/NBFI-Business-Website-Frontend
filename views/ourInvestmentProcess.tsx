import React from 'react'
import { useTranslation } from 'react-i18next';

const ourInvestmentProcess = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className='container mx-auto py-8 md:px-0 px-4'>
                <h2 className='text-3xl sm:text-4xl text-primary heading-title'
                    dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}
                >

                </h2>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    {sectionData && sectionData?.blocks?.map((block: any, index: any) => (
                        <div key={index} className="bg-[#F5F5F5] p-6 mt-4 shadow">
                            <div className="">
                                <img src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.featuredimage}`} className="" />
                                <h3 className="mt-4 text-lg sm:text-xl font-medium heading-title color-green" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.title : block?.title_urdu }}></h3>
                                <p className='text-base'
                                    dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}
                                ></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ourInvestmentProcess
