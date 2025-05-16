import React from 'react'
import { useTranslation } from 'react-i18next';

const keyFeatures = ({ sectionData }: any) => {
    const { i18n } = useTranslation();

    return (
        <>
            <div className='container bg-awtgreen p-10 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center ' style={{marginBlock: '32px'}}>
                <div>
                    <h2 className='text-3xl sm:text-4xl text-white mb-3' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}></h2>
                    <p className='text-white text-base font-normal' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}></p>
                </div>
                <div>
                    {sectionData?.blocks?.map((item: any, index: any) => (
                        <p key='index' className='text-white columns-2 text-base font-normal'
                            dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? item?.description : item?.description_urdu }}
                        ></p>
                    ))}
                    {/* <div>
                    <p className='text-white columns-2'>
                        Portfolio Value <br />
                        Portfolio Allocation <br />
                        Funds performance <br />
                        E-transactions <br />
                        Portfolio analytics <br />
                        Tax calculator <br />
                        Funds NAV <br />
                    </p>
                </div> */}
                </div>
            </div>
        </>
    )
}

export default keyFeatures
