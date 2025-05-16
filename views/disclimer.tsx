import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Disclaimer: FC = ({ sectionData }: any) => {
  const { t, i18n } = useTranslation();
  const isRTL: boolean = i18n.language === 'ur';

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center w-full lg:w-2/4 mx-auto gap-5 px-4">
      <div className="w-full sm:w-auto flex justify-center">
        <Image
          src={`${process.env.NEXT_PUBLIC_Image_Path}/sections_image/${sectionData?.featuredimage}`}
          alt={i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}
          className="max-w-[100px] sm:max-w-[120px] md:max-w-[150px]"
          width='80'
          height='80'
          priority
        />
      </div>
      <div>
        <p className={`text-xs w-full sm:w-auto   ${isRTL ? 'sm:text-right' : 'sm:text-left text-center'}`}>
          <b>{i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}</b>
        </p>
        <p className="text-xs w-full sm:w-auto" style={{ textAlign: 'justify' }}
          dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.description : sectionData?.description_urdu }}>
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;