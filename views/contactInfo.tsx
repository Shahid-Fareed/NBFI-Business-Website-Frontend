import React from 'react'
import { useTranslation } from 'react-i18next';

const contactInfo = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className="container mx-auto md:px-0 px-4">
                <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 '>
                    {sectionData?.blocks?.map((block: any, index: any) => (
                        <div
                            key={index}
                            className={`p-10 ${index % 2 === 0 ? 'bg-awtgreen text-white' : 'bg-[#DCE3F2] text-black'
                                }`}
                        >
                            <h2
                                className="text-3xl heading-title mb-3"
                                dangerouslySetInnerHTML={{
                                    __html: i18n.language === 'en' ? block?.title : block?.title_urdu,
                                }}
                            ></h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: i18n.language === 'en' ? block?.description : block?.description_urdu,
                                }}
                            ></p>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default contactInfo
