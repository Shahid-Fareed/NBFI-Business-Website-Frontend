"use client";

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
// import Link from 'next/link';
import img from 'next/img';

const AppSection: FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation(); // Initialize translation

  return (
    <>
      <div className="container mx-auto px-4 lg:px-0 py-8 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="flex flex-col md:w-1/3 text-center md:text-start mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl text-black mb-4" dangerouslySetInnerHTML={{ __html: t('appSection.title') }} />
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            {t('appSection.description')}
          </p>
          <div className="flex justify-center md:justify-start gap-3">
            <img
              src="/assets/android app.png"
              alt={t('appSection.androidDownload')}
              className="w-32 sm:w-36"
            />
            <img
              src="/assets/apple app.png"
              alt={t('appSection.iosDownload')}
              className="w-32 sm:w-36"
            />
          </div>
        </div>

        {/* img Content */}
        <div className="md:w-2/3 flex justify-center">
          <img
            src="/assets/mobileapp.png"
            alt="Mobile App"
            className=""
          />
        </div>
      </div>
    </>
  );
};

export default AppSection;