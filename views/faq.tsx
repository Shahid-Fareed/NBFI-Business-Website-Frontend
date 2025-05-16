"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const faq = ({ sectionData }:any) => {
    const { i18n } = useTranslation();

    const [openIndex, setOpenIndex] = useState(null); // To track which FAQ is open

    const handleToggle = (index:any) => {
        setOpenIndex(index === openIndex ? null : index); // Close if the same index is clicked
    };

    return (
        <>
        <div className='container md:px-0 px-4 py-8'>
            <div className=''>
                <p className="text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}></p>
            </div>
            <div >
                <div className="max-w-4xl mx-auto p-4">
                    {/* <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1> */}
                    <div className="space-y-2 divide-y-2">
                        {sectionData && sectionData?.blocks?.map((block:any, index:any) => (
                            <div
                                key={index}
                                className=" py-4"
                            >
                                <div
                                    className="flex gao-3 justify-between items-center cursor-pointer"
                                    onClick={() => handleToggle(index)}
                                >
                                    <span className="text-lg font-semibold text-black">
                                        {i18n.language === 'en' ? block?.title : block?.title_urdu}
                                    </span>
                                    <span style={{minWidth: '40px'}}>
                                        {openIndex === index ? (
                                            <img
                                                src="/assets/faqarrowdown.png" // Replace with your "arrow up" icon path
                                                alt="Arrow Up"
                                                className=""
                                            />
                                        ) : (
                                            <img
                                                src="/assets/faqarrowup.png" // Replace with your "arrow down" icon path
                                                alt="Arrow Down"
                                                className=""
                                            />
                                        )}
                                    </span>
                                </div>
                                
                                {openIndex === index && (
                                    <p className="mt-2 text-base text-black transition-all" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}></p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default faq
