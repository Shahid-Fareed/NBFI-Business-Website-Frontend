"use client";

import React, { useState, FC } from "react";
import { useTranslation } from 'react-i18next';

const AwtInvestment: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("Mutual Funds");
  const [openAccordion, setOpenAccordion] = useState<string>("");

  const toggleAccordion = (section: string): void => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  const tabData: Record<string, { title: string; description: JSX.Element }> = {
    "Mutual Funds": {
      title: t("awtInvestment.tabs.Mutual Funds"),
      description: (
        <div>
          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left py-2 px-4 text-lg font-medium bg-transparent border-none focus:outline-none"
              onClick={() => toggleAccordion("objective")}
            >
              {t("awtInvestment.accordion.AWT Islamic Income Fund")}
              <span className="ml-2">
                {openAccordion === "objective" ? (
                  <i className="fas fa-angle-up"></i>
                ) : (
                  <i className="fas fa-angle-down"></i>
                )}
              </span>
            </button>
            {openAccordion === "objective" && (
              <div className="px-4 py-2">
                <h3 className="font-medium">{t("awtInvestment.accordion.Investment Objective")}</h3>
                <p>{t("awtInvestment.accordion.The investment objective of the Fund")}</p>
                <br />
                <h3 className="font-medium">{t("awtInvestment.accordion.Benefits")}</h3>
                <div className="px-4 py-2 bg-white">
                  <ul className="list-disc ml-6">
                    <li>{t("awtInvestment.accordion.Rated A+(f)")}</li>
                    <li>{t("awtInvestment.accordion.No lock-in period")}</li>
                    <li>{t("awtInvestment.accordion.Minimum investment limit")}</li>
                  </ul>
                </div>
                <a href="#" className="text-black mt-4 block">
                  {t("awtInvestment.accordion.Read More")} <i className="fas fa-angle-right"></i>
                </a>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left py-2 px-4 text-lg font-medium bg-transparent border-none focus:outline-none"
              onClick={() => toggleAccordion("AWT Income Fund")}
            >
              {t("awtInvestment.accordion.AWT Income Fund")}
              <span className="ml-2">
                {openAccordion === "AWT Income Fund" ? (
                  <i className="fas fa-angle-up"></i>
                ) : (
                  <i className="fas fa-angle-down"></i>
                )}
              </span>
            </button>
            {openAccordion === "AWT Income Fund" && (
              <div className="px-4 py-2">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt necessitatibus, corrupti illum sequi voluptatibus aut aperiam architecto, eaque eligendi possimus quasi tenetur, quidem quia unde quo harum nobis hic. Quibusdam!</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left py-2 px-4 text-lg font-medium bg-transparent border-none focus:outline-none"
              onClick={() => toggleAccordion("AWT Financial Sector Income Fund")}
            >
              {t("awtInvestment.accordion.AWT Financial Sector Income Fund")}
              <span className="ml-2">
                {openAccordion === "AWT Financial Sector Income Fund" ? (
                  <i className="fas fa-angle-up"></i>
                ) : (
                  <i className="fas fa-angle-down"></i>
                )}
              </span>
            </button>
            {openAccordion === "AWT Financial Sector Income Fund" && (
              <div className="px-4 py-2">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt necessitatibus, corrupti illum sequi voluptatibus aut aperiam architecto, eaque eligendi possimus quasi tenetur, quidem quia unde quo harum nobis hic. Quibusdam!</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left py-2 px-4 text-lg font-medium bg-transparent border-none focus:outline-none"
              onClick={() => toggleAccordion("AWT Money Market Fund")}
            >
              {t("awtInvestment.accordion.AWT Money Market Fund")}
              <span className="ml-2">
                {openAccordion === "AWT Money Market Fund" ? (
                  <i className="fas fa-angle-up"></i>
                ) : (
                  <i className="fas fa-angle-down"></i>
                )}
              </span>
            </button>
            {openAccordion === "AWT Money Market Fund" && (
              <div className="px-4 py-2">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt necessitatibus, corrupti illum sequi voluptatibus aut aperiam architecto, eaque eligendi possimus quasi tenetur, quidem quia unde quo harum nobis hic. Quibusdam!</p>
              </div>
            )}
          </div>

          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left py-2 px-4 text-lg font-medium bg-transparent border-none focus:outline-none"
              onClick={() => toggleAccordion("AWT Money Market Fund2")}
            >
              {t("awtInvestment.accordion.AWT Money Market Fund")}
              <span className="ml-2">
                {openAccordion === "AWT Money Market Fund2" ? (
                  <i className="fas fa-angle-up"></i>
                ) : (
                  <i className="fas fa-angle-down"></i>
                )}
              </span>
            </button>
            {openAccordion === "AWT Money Market Fund2" && (
              <div className="px-4 py-2">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt necessitatibus, corrupti illum sequi voluptatibus aut aperiam architecto, eaque eligendi possimus quasi tenetur, quidem quia unde quo harum nobis hic. Quibusdam!</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    "Investment Advisory": {
      title: t("awtInvestment.tabs.Investment Advisory"),
      description: <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt necessitatibus, corrupti illum sequi voluptatibus aut aperiam architecto, eaque eligendi possimus quasi tenetur, quidem quia unde quo harum nobis hic. Quibusdam!</p>,
    },
    "Voluntary Pension Funds": {
      title: t("awtInvestment.tabs.Voluntary Pension Funds"),
      description: <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt necessitatibus, corrupti illum sequi voluptatibus aut aperiam architecto, eaque eligendi possimus quasi tenetur, quidem quia unde quo harum nobis hic. Quibusdam!</p>,
    },
  };

  return (
    <>
      <div className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl text-black mb-4" dangerouslySetInnerHTML={{ __html: t('awtInvestment.Why AWT Investment') }} />
          <p className="text-black text-lg mb-8">
            {t("awtInvestment.AWT Main Description")}
          </p>

          <div className="flex flex-col gap-5 md:flex-row rounded-lg">
            <div className="flex flex-col gap-4 rounded-md md:w-1/4 md:mr-4 mb-4 md:mb-0">
              {Object.keys(tabData).map((tab: string) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full px-4 py-5 font-medium ${activeTab === tab
                      ? "bg-awtgreen text-white border border-primary"
                      : "bg-white text-primary border border-primary focus:outline-none"
                    }`}
                >
                  {tabData[tab].title}
                </button>
              ))}
            </div>

            <div className={`flex-1 bg-white border border-awtgreen rounded-md p-4 tab-content ${openAccordion ? 'h-full' : 'overflow-auto max-h-[50vh]'}`}>
              {tabData[activeTab].description}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AwtInvestment;