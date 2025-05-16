import React from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const fundManagement = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    return (
        <>
            <div className='container mx-auto md:px-0 px-4 py-8'>
                <div className='my-5'>
                    <h2 className='font-semibold text-lg sm:text-xl'>{i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mt-4'>
                        {sectionData && sectionData?.blocks?.map((block: any, index: any) => (
                            <div key={index} className="border border-primary rounded-xl p-6 bg-white hover:bg-awtgreen relative grid items-end group transition-all duration-200" style={{ height: '190px' }}>
                                <h3 className="text-3xl md:text-4xl !leading-3 font-medium mb-2 absolute top-0 left-[50%] translate-x-[-50%] text-black text-opacity-25 group-hover:text-white group-hover:text-opacity-25 -mx-6" style={{ opacity: '0.3', transform: 'translateX(-50%)', width: '100%', marginTop: '-9px', textAlign: 'center' }}>{i18n.language === 'en' ? block?.subtitle : block?.subtitle_urdu}</h3>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-base font-medium group-hover:text-white"
                                            dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}
                                        ></p>

                                        <h3 className="text-lg sm:text-xl font-medium group-hover:text-white">{i18n.language === 'en' ? block?.title : block?.title_urdu}</h3>
                                    </div>
                                    <Link href={block?.button_url}>
                                        <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl" />
                                    </Link>
                                </div>


                            </div>
                        ))}

                    </div>

                </div >
            </div >
        </>
    )
}

export default fundManagement
