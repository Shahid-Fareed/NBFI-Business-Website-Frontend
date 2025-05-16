import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';


const AppSection: FC = ({ sectionData }: any) => {
  const { t }: { t: (key: string) => string } = useTranslation(); // Initialize translation
  const { i18n } = useTranslation();

  return (
    <>
      <div className="container mx-auto px-4 sm:px-0 py-8 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="flex flex-col md:w-1/3 text-center md:text-start mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl text-black heading-title mb-4" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }} />
          <p className="text-base sm:text-lg text-black mb-6"
            dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}
          >
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-start gap-3">
            <Image
              src="/assets/android app.png"
              alt={t('appSection.androidDownload')}
              className="w-fit md:w-1/2"
              width='220'
              height='70'
            />
            <Image
              src="/assets/apple app.png"
              alt={t('appSection.iosDownload')}
              className="w-fit md:w-1/2"
              width='220'
              height='70'
            />
          </div>
        </div>

        {/* img Content */}
        <div className="md:w-2/3 flex justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
            alt={sectionData?.alt}
            className=""
            width='630'
            height='540'
            priority
          />
        </div>
      </div>
    </>
  );
};

export default AppSection;