import React from 'react'
import { useTranslation } from 'react-i18next';


const investmentSteps = ({ sectionData }: any) => {
    const { i18n } = useTranslation();
    function decodeHtml(html: any) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    return (
        <div className="container py-8 px-4 sm:px-0">
            <h2 className='text-xl font-semibold md:text-2xl text-black ' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
            <p className='text-base pb-4' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}></p>

            <div className='grid sm:grid-cols-2 grid-cols-1 gap-5  '>
                {sectionData?.blocks.map((block: any, index: any) => (
                    <div className={`p-10 ${index % 2 === 0 ? 'bg-awtgreen' : 'bg-primary'
                        }`}>
                        <p className='text-lg text-white'>{block?.subtitle}</p>
                        <h2 className='text-3xl text-white mb-3 font-semibold'
                            dangerouslySetInnerHTML={{
                                __html: i18n.language === "en" ? block?.title : block?.title_urdu,
                            }}
                        ></h2>
                        <p className='text-white des' dangerouslySetInnerHTML={{
                            __html: decodeHtml(i18n.language === "en" ? block?.description : block?.description_urdu),
                        }}>
                        </p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default investmentSteps
