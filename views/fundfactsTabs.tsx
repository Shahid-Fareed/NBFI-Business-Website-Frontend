"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FundFacts = ({ tabs }: any) => {
    const { i18n } = useTranslation();

    // Safely set the default active tab
    const [activeTab, setActiveTab] = useState(tabs?.[0]?.title || "");

    return (
        <>
            <div className="py-12">
                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b-4 relative">
                    <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                        <span className="w-4 h-1 bg-primary text-primary"></span>
                        <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
                        <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
                    </div>

                    {/* Render tab buttons */}
                    {tabs &&
                        tabs?.map((tab: any, index: any) => (
                            <button
                                key={tab?.id || index} // Use tab.id if available
                                className={`py-2 text-primary -mb-1 border-0 rounded-none font-medium focus:outline-none bg-transparent ${activeTab === tab.title
                                        ? "border-b-4 border-primary"
                                        : ""
                                    }`}
                                onClick={() => setActiveTab(tab?.title)}
                            >
                                {i18n.language === "en" ? tab?.title : tab?.title_urdu}
                            </button>
                        ))}
                </div>

                {/* Conditional Content */}
                {tabs &&
                    tabs?.map((tab: any) => {
                        if (activeTab !== tab?.title) return null; // Render only active tab content

                        return (
                            <div key={tab?.id || tab.title}>
                                {/* Tab Title */}
                                <h2
                                    className="text-4xl text-primary font-normal heading-title color-green"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            i18n.language === "en"
                                                ? tab.title
                                                : tab.title_urdu,
                                    }}
                                ></h2>

                                {/* Tab Blocks */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5">
                                    {tab.blocks &&
                                        tab?.blocks?.map((block: any, index: any) => (
                                            <div
                                                key={block?.id || index}
                                                className="bg-[#DCE3F2] p-6 mt-4 hover:bg-white flex flex-col justify-center relative"
                                            >
                                                <div className="grid grid-col gap-2 justify-between absolute left-0 top-0 h-full">
                                                    <span className="w-1 bg-primary text-primary">| </span>
                                                    <span className="w-1 bg-[#946B29] text-[#946B29]"> |</span>
                                                    <span className="w-1 bg-awtgreen text-awtgreen"> |</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        {i18n.language === "en"
                                                            ? block?.subtitle
                                                            : block?.subtitle_urdu}
                                                    </p>
                                                    <h3 className="text-2xl">
                                                        {i18n.language === "en"
                                                            ? block?.title
                                                            : block?.title_urdu}
                                                    </h3>
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                i18n.language === "en"
                                                                    ? block?.description
                                                                    : block?.description_urdu,
                                                        }}
                                                    ></p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default FundFacts;
