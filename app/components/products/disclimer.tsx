"use client";

import React, { FC } from "react";
import { useTranslation } from "react-i18next";


const Disclaimer: FC = () => {
  const { t, i18n } = useTranslation(); 
  const isRTL: boolean = i18n.language === 'ur'; 

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center w-full lg:w-2/4 mx-auto gap-5 px-4 py-8">
      <div className="w-full sm:w-auto flex justify-center">
        <img src="/assets/SECP-logo.png" alt={t("secpLogoAlt")} className="max-w-[100px] sm:max-w-[120px] md:max-w-[150px]" />
      </div>
      <p className="text-xs w-full sm:w-auto" style={{textAlign: 'justify'}}>
        <b>{t("disclaimerHeading")}</b>
        <br />
        {t("disclaimerContent")}
      </p>
    </div>
  );
};

export default Disclaimer;