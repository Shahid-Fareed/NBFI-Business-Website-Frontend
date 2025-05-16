"use client";
import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const FundFacts = ({ Factscard }:any) => {
    const [activeTab, setActiveTab] = useState("Fund Facts");

    const tabs = ["Fund Facts", "Price History"];

    const data = [
        {
          title: "Constitutional Documents",
          bgColor: "bg-awtgreen",
        },
        {
          title: "Financials",
          bgColor: "bg-[#946B29]",
        },
        {
          title: "Forms",
          bgColor: "bg-primary",
        },
      ];

    return (
        <div className="py-8 px-4 sm:px-0">
            {/* Tabs */}
            <div className="flex gap-7 mb-6 border-b-4 relative">
                <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                    <span className="w-4 h-1 bg-primary"></span>
                    <span className="w-4 h-1 bg-[#946B29]"></span>
                    <span className="w-4 h-1 bg-awtgreen"></span>
                </div>

                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 text-primary text-xl rounded-none px-0 border-0 -mb-1 focus:outline-none bg-transparent ${activeTab === tab ? "border-b-4 border-primary font-semibold" : ""
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Title */}
            {/* <h2 className="text-4xl text-primary font-normal">
                {Factstitle1}
                <span className="text-awtgreen font-semibold">{Factstitle2}</span>
            </h2> */}

            {/* Conditional Content */}
            {activeTab === "Fund Facts" && (
                <>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5">
                    {Factscard?.map((cv, index) => (
                        <div
                            key={index}
                            className="bg-[#DCE3F2] p-6 mt-4 hover:bg-white flex flex-col justify-center relative"
                        >
                            <div className="grid grid-cols-1 gap-2 absolute left-0 top-0 h-full">
                                <span className="w-1 bg-primary"></span>
                                <span className="w-1 bg-[#946B29]"></span>
                                <span className="w-1 bg-awtgreen"></span>
                            </div>
                            <div>
                                <p className="font-semibold text-base">Fund Type</p>
                                <h3 className="text-2xl">{cv.title}</h3>
                                <p>{cv.content}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                    {data.map((category, index)=>(
                        <div key={index} className={`${category.bgColor} p-6 text-white`}>
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <h3 className="text-base font-semibold">
                                    {category.title}
                                    </h3>
                                </div>
                                <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
                            </div>
                        </div>
                    ))}
                    </div>
                    </>
            )}

            {activeTab === "Price History" && (
                <div className="mt-6">
                    {/* Date Picker */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex flex-col w-1/3 ">
                            <label className="text-sm font-semibold mb-1">From</label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded p-2 text-sm"
                            />
                        </div>
                        <div className="flex flex-col w-1/3 ">
                            <label className="text-sm font-semibold mb-1">To</label>
                            <input
                                type="date"
                                className="border border-gray-300 rounded p-2 text-sm"
                            />
                        </div>
                        <button className=" w-1/3 bg-primary text-white rounded px-6 py-2 mt-auto">
                            Submit
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="px-4 py-2">Offer Price (Rs.)</th>
                                    <th className="px-4 py-2">Redemption Price (Rs.)</th>
                                    <th className="px-4 py-2">NAV (Rs.)</th>
                                    <th className="px-4 py-2">Applicable Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td className="px-4 py-2">113.9595</td>
                                        <td className="px-4 py-2">110.6403</td>
                                        <td className="px-4 py-2">110.6403</td>
                                        <td className="px-4 py-2">Dec 31, 2024</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* View More Button */}
                    <button className="bg-primary text-white rounded px-6 py-2 mt-6">
                        View More
                    </button>
                </div>
            )}
        </div>
    );
};

export default FundFacts;
