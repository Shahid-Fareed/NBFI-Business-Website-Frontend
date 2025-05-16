"use client";

import img from 'next/img';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const ProductOffer: FC = () => {
    const { t }: { t: (key: string) => string } = useTranslation();

    return (
        <>
            <div className="bg-primary text-white pt-16 md:pb-48 pb-36">
                <div className="container mx-auto px-4 md:px-0">
                    <h2 className="text-lg text-[#F0AF45] font-semibold mb-4">
                        <span className="text-white">{t('productOffer.ourProduct')} </span>
                        {t('productOffer.offerings')}
                    </h2>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
                        {t('productOffer.discoverYour')} <br className="hidden md:block" /> 
                        {t('productOffer.investmentPotential')}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="md:w-1/3 w-full">
                            <img src="/assets/fund.png" className="mb-5" alt={t('productOffer.fundsAlt')}  />
                            <h3 className="text-2xl font-semibold mb-2">{t('productOffer.fundsTitle')}</h3>
                            <p className="sm:text-lg mb-4">
                                {t('productOffer.fundsDescription')}
                            </p>
                            <button className="whitebtn flex items-center">
                                <span className="mr-3">{t('productOffer.findMore')}</span>
                                <img src="/assets/whiteVector.png" className="w-4 h-4" alt={t('productOffer.investorIconAlt')} />
                            </button>
                        </div>

                        <div className="md:w-1/3 w-full md:mt-0 mt-10">
                            <img src="/assets/fund.png" className="mb-5" alt={t('productOffer.savingsPlanAlt')} />
                            <h3 className="text-2xl font-semibold mb-2">{t('productOffer.savingsPlanTitle')}</h3>
                            <p className="sm:text-lg mb-4">
                                {t('productOffer.savingsPlanDescription')}
                            </p>
                            <button className="whitebtn flex items-center">
                                <span className="mr-3">{t('productOffer.findMore')}</span>
                                <img src="/assets/whiteVector.png" className="w-4 h-4" alt={t('productOffer.investorIconAlt')}/>
                            </button>
                        </div>

                        <div className="md:w-1/3 w-full md:mt-0 mt-10">
                            <img src="/assets/fund.png" className="mb-5" alt={t('productOffer.investmentAdvisoryAlt')}/>
                            <h3 className="text-2xl font-semibold mb-2">{t('productOffer.investmentAdvisoryTitle')}</h3>
                            <p className="sm:text-lg mb-4">
                                {t('productOffer.investmentAdvisoryDescription')}
                            </p>
                            <button className="whitebtn flex items-center">
                                <span className="mr-3">{t('productOffer.findMore')}</span>
                                <img src="/assets/whiteVector.png" className="w-4 h-4" alt={t('productOffer.investorIconAlt')} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-2/3 mx-auto mt-[-60px] md:mt-[-120px] px-4">
                <img src="/assets/video.png" alt={t('productOffer.thumbnailAlt')} className="w-full rounded-lg shadow-lg"/>
            </div>
        </>
    );
};

export default ProductOffer;