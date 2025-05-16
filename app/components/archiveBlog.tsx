"use client";
import React, { useState } from 'react'
const tabs = ["All", "News", "Announcements"];
import { useTranslation } from 'react-i18next';
import { GoArrowUpRight } from "react-icons/go";





const data = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    title: "Change in Management Fee, Selling & Marketing Expenses and Allocated Expenses",
    description:
        "An update on current fund terms and recently modified documents in the Offering Document with reference to Fees.",
    year: 2025,
    category: index % 2 === 0 ? "News" : "Announcements",
}));
const archiveBlog = ({ sectionData }: any) => {

    const [activeTab, setActiveTab] = useState("All");
        const [selectedYear, setSelectedYear] = useState("");
        const [searchKeyword, setSearchKeyword] = useState("");
    
        const { i18n } = useTranslation();
    
        const filteredData = data.filter((item) => {
            return (
                (activeTab === "All" || item.category === activeTab) &&
                (selectedYear ? item.year === parseInt(selectedYear) : true) &&
                (searchKeyword ? item.title.toLowerCase().includes(searchKeyword.toLowerCase()) : true)
            );
        });

    return (
        <>
            <div className='container'>
                <div className="py-6">
                    {/* Tabs */}
                    <div className="flex border-b-4 border-gray-200 relative">
                    <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                        <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
                        <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
                        <span className="w-4 h-1 bg-primary text-primary"></span>
                    </div>
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`bg-transparent border-0 rounded-none -mb-1 py-2 text-primary focus:outline-none font-medium ${activeTab === tab ? "border-b-4 border-primary " : ""
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                        <input
                            type="text"
                            placeholder="Search by keyword"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded"
                        />
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Year</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select>
                        <button
                            onClick={() => {
                                setSearchKeyword("");
                                setSelectedYear("");
                            }}
                            className="w-full md:w-1/3 px-4 py-2 bg-awtgreen text-white rounded"
                        >
                            Clear Filters
                        </button>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {filteredData.map((item, index) => {
                            // Define three background colors
                            const bgColors = ["bg-awtgreen text-white", "bg-[#946B29] text-white", "bg-primary text-white"];
                            // Determine which color to use based on index
                            const bgColor = bgColors[index % 3];

                            return (
                                <div
                                    key={item.id}
                                    className="border border-gray-300 py-4 pr-4 shadow hover:shadow-lg transition"
                                >
                                    <div className="flex gap-5 items-start">
                                        <div className={`px-2 py-4 min-w-max text-sm ${bgColor}`}>
                                            <p>January 10</p>
                                            <h3 className="text-2xl font-semibold">{item.year}</h3>
                                        </div>
                                        <div>
                                            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                                            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                            <div className="mt-4 flex gap-4 items-center">
                                                <a href="#" className="text-base font-semibold">
                                                    READ MORE
                                                </a>
                                                <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-3xl group-hover:bg-white group-hover:text-primary transition-all duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Load More */}
                    {filteredData.length > 9 && (
                        <div className="mt-6 flex justify-center">
                            <button className="px-4 py-2 bg-awtgreen text-white">
                                View More
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default archiveBlog
