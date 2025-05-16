'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentRequired = ({ sectionData }: any) => {
    const { i18n } = useTranslation();

    const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which FAQ is open

    const handleToggle = (index: number) => {
        setOpenIndex(index === openIndex ? null : index); // Close if the same index is clicked
    };

    return (
        <div className="container py-8 px-4 sm:px-0">
            <p
                className="text-base pb-4"
                dangerouslySetInnerHTML={{
                    __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu
                }}
            ></p>

            <div className="container bg-[#DCE3F2] p-10">
                <h2 className="font-semibold text-2xl text-black mb-5">
                    {i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {sectionData?.blocks?.[0] && (
                        <div>
                            <h3 className="font-medium">{sectionData.blocks[0]?.title}</h3>
                            <p className="" dangerouslySetInnerHTML={{
                                __html: i18n.language === 'en' ? sectionData.blocks[0]?.description : sectionData.blocks[0]?.description_urdu
                            }}>
                            </p>
                        </div>
                    )}


                    <div>
                        <h3 className="font-medium">{sectionData.blocks[1]?.title}</h3>
                        <div className="space-y-2 divide-y-4 !divide-primary">
                            {sectionData?.blocks?.slice(2).map((block: any, index: number) => (
                                <div key={index} className="py-4" style={{borderBottom: '1px solid #B7BDD0'}}>
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => handleToggle(index)}
                                    >
                                        <span className=" text-black">
                                            {i18n.language === 'en' ? block?.title : block?.title_urdu}
                                        </span>
                                        <span>
                                            {openIndex === index ? (
                                                <img
                                                src="/assets/faqarrowdown.png"
                                                alt="Arrow Down"
                                            />
                                            ) : (
                                                
                                                <img
                                                    src="/assets/faqarrowup.png"
                                                    alt="Arrow Up"
                                                />
                                            )}
                                        </span>
                                    </div>
                                    {openIndex === index && (
                                        <p className="mt-2 text-black transition-all" dangerouslySetInnerHTML={{
                                            __html: i18n.language === 'en' ? block?.description : block?.description_urdu
                                        }}></p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentRequired;
