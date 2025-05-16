import React from 'react'
import { useTranslation } from "react-i18next";

const openingAccount = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center my-12 ">
                {/* Text Content */}
                <div className="md:col-span-2 flex flex-col justify-center text-center md:text-left px-4 md:px-0">
                    <p className="text-sm md:text-base text-gray-500 font-medium mb-2" >{i18n.language === "en" ? sectionData?.subtitle : sectionData?.subtitle_urdu}</p>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 heading-title" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}}></h2>
                    <p className="text-sm md:text-base text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html:
                                i18n.language === "en"
                                    ? sectionData?.description
                                    : sectionData?.description_urdu,
                        }}
                    ></p>
                </div>

                {/* Image */}
                <div className="md:col-span-1">
                    <img
                        className="w-full max-w-xs md:max-w-full rounded-2xl mx-auto md:mx-0"
                        src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
                        alt={sectionData?.alt || "Opening Account"}
                    />
                </div>
            </div>

        </>
    )
}

export default openingAccount
