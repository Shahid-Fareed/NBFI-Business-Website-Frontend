"use client";

import React, { FC } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from 'react-i18next';

const InvestmentProcess: FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation(); // Initialize translation

  return (
    <>
      <div className="py-20 bg-awtgreen">
        <div className="container mx-auto md:px-0 px-4 lg:flex lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-4" dangerouslySetInnerHTML={{ __html: t('investmentProcess.title') }} />
            <p className="text-base md:text-lg text-white">
              {t('investmentProcess.description')}
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-1/2">
            <div className="p-6 border flex flex-col justify-between border-white rounded-xl gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg md:text-xl font-bold">{t('investmentProcess.step1Title')}</h3>
                <GoArrowUpRight className="bg-white bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl" />
              </div>
              <h3 className="text-white text-base md:text-lg">{t('investmentProcess.step1Description')}</h3>
            </div>

            <div className="p-6 border flex flex-col justify-between border-white rounded-xl gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg md:text-xl font-bold">{t('investmentProcess.step2Title')}</h3>
                <GoArrowUpRight className="bg-white bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl" />
              </div>
              <h3 className="text-white text-base md:text-lg">{t('investmentProcess.step2Description')}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentProcess;