import React from 'react'
import { useTranslation } from 'react-i18next';

const careerValues = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className="container p-6 md:p-8 bg-awtgreen" style={{marginBlock: '50px'}}>
                <h2 className="text-3xl sm:text-4xl text-white heading-title  text-center md:text-left"
                    dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}
                >
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-6">
                    {sectionData?.blocks?.map((block: any, index: any) => (
                        <div
                            key={index}
                            className="mt-5"
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.featuredimage}`}
                                alt={block?.alt}
                                className="w-16 h-16 mx-auto md:mx-0 mix-blend-plus-lighter" style={{ mixBlendMode: 'plus-lighter'}}
                            />
                            <h3 className="text-white mt-4 text-lg sm:text-xl font-medium text-center md:text-left">
                                {block?.title}
                            </h3>
                            <p className="mt-2 text-base font-normal text-white text-center md:text-left leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}
                            >
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default careerValues
