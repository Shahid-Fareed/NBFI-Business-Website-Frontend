import React from 'react'
import { useTranslation } from 'react-i18next';

const signupProcess = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className='container px-4 sm:px-0 py-8'>
                <h2 className='text-2xl font-semibold font-sans heading-title mb-4' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                <div className='grid grid-cols-1 md:grid-cols-5 sm:grid-cols-2 gap-5'>
                    {sectionData && sectionData?.blocks?.map((block: any, index: any) => (

                        <div key={index}>
                            <h3 className='text-8xl font-black -mb-8 text-black text-opacity-5'>{i18n.language === 'en' ? block?.subtitle : block?.subtitle_urdu}</h3>
                            <h3 className='text-base font-semibold leading-4 mb-4'>{i18n.language === 'en' ? block?.title : block?.title_urdu}</h3>
                            <p className='text-base'
                                dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}
                            >
                            </p>
                            {block?.featuredimage?.length > 0 && block?.icon?.length > 0 ?
                                <div className="space-y-2">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.featuredimage}`}
                                        alt={block?.alt}
                                        // className="w-32 sm:w-36"
                                    />
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.icon}`}
                                        alt={block?.alt}
                                        // className="w-32 sm:w-36"
                                    />
                                </div> :
                                ""
                            }


                        </div >

                    ))}
                </div>
            </div >
        </>
    )
}

export default signupProcess
