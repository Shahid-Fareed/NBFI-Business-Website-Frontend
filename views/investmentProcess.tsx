import React, { FC } from 'react';
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const InvestmentProcess: FC = ({ sectionData }: any) => {
  const { i18n } = useTranslation();

  return (
    <>
      <div className="py-20 bg-awtgreen">
        <div className="container mx-auto md:px-0 px-4 lg:flex lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl text-white mb-4 heading-title" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }} />
            <p className="text-base text-white"
              dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}
            >
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-1/2">
            {sectionData && sectionData?.blocks?.map((block: any, index: any) => (
               
                <div className="p-6 border flex flex-col justify-between border-white rounded-lg gap-10 hover:bg-white group transition" key={index}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-white group-hover:text-primary text-lg md:text-2xl font-semibold">{i18n.language === 'en' ? block?.subtitle : block?.subtitle_urdu}</h3>
                    <Link href={block?.button_url} >
                    <GoArrowUpRight className="bg-white group-hover:bg-primary group-hover:text-white bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl" />
                    </Link>
                  </div>
                  <h3 className="text-white group-hover:text-primary text-lg md:text-xl font-semibold">{i18n.language === 'en' ? block?.title : block?.title_urdu}</h3>
                </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentProcess;