import React, { useState, FC } from "react";
import { useTranslation } from "react-i18next";
import Link from 'next/link';

const AwtInvestment: FC = ({ tabs, sectionData }: any) => {
  const { t, i18n } = useTranslation();
  // Filter tabs to include only those with non-empty blocks
  const filteredTabs = tabs?.filter((tab: any) => tab.blocks && tab.blocks.length > 0);

  const [activeTab, setActiveTab] = useState<string>(
    filteredTabs[0]?.title || "" // Default to the first valid tab
  );
  const [openAccordion, setOpenAccordion] = useState<string>("");

  const toggleAccordion = (blockTitle: string): void => {
    setOpenAccordion(openAccordion === blockTitle ? "" : blockTitle);
  };

  return (
    <div className="py-8 px-6">
      <div className="container mx-auto">
        <h2
          className="text-4xl text-black mb-4 heading-title"
          dangerouslySetInnerHTML={{
            __html: i18n.language === "en" ? sectionData?.title : sectionData?.title_urdu,
          }}
        />
        <p
          className="text-black text-base mb-8"
          dangerouslySetInnerHTML={{
            __html: i18n.language === "en" ? sectionData?.description : sectionData?.description_urdu,
          }}
        ></p>
        <p
          className="text-black font-semibold text-base mt-4 mb-4"
          dangerouslySetInnerHTML={{
            __html: i18n.language === "en" ? sectionData?.subtitle : sectionData?.subtitle_urdu,
          }}
        ></p>

        <div className="flex flex-col gap-5 md:flex-row rounded-lg">
          {/* Tabs */}
          <div className="flex flex-col gap-4 rounded-md md:w-1/4 md:mr-4 mb-4 md:mb-0">
            {filteredTabs?.map((tab: any) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(tab?.title)}
                className={`w-full text-base px-4 py-5 font-semibold border border-primary ${activeTab === tab?.title
                  ? "bg-awtgreen text-white"
                  : "bg-white text-primary focus:outline-none"
                  }`}
              >
                {i18n.language === "en" ? tab?.title : tab?.title_urdu}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div 
          style={!openAccordion ? { maxHeight: "230px" } : {}}
            className={`flex-1 bg-white border border-awtgreen rounded-md p-4 tab-content ${openAccordion ? "h-full" : "overflow-auto"
              }`}
          >
            {filteredTabs
              .find((tab: any) => tab.title === activeTab)
              ?.blocks?.map((block: any) => (
                <div className="mb-4" key={block.title}>
                  {/* Accordion Button */}
                  <button
                    className="w-full flex gap-3 justify-between items-center text-left py-2 px-4 text-base font-semibold bg-transparent border-none focus:outline-none"
                    onClick={() => toggleAccordion(block?.title)}
                  >
                    {i18n.language === "en" ? block?.title : block?.title_urdu}
                    
                    <span className="" style={{minWidth: '40px'}}>
                      {openAccordion === block?.title ? (
                        <img
                          src="/assets/faqarrowdown.png" // Replace with your "arrow up" icon path
                          alt="Arrow Up"
                          className=""
                        />
                      ) : (
                        <img
                          src="/assets/faqarrowup.png" // Replace with your "arrow down" icon path
                          alt="Arrow Down"
                          className=""
                        />
                      )}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {openAccordion === block?.title && (
                    <div className="px-4 py-2">
                      <p className="tex-base"
                        dangerouslySetInnerHTML={{
                          __html: i18n.language === "en" ? block?.description : block?.description_urdu,
                        }}
                      ></p>

                      <Link href={block?.button_url}>
                        {i18n.language === "en" ? block?.button_text : block?.button_text_urdu}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AwtInvestment;
