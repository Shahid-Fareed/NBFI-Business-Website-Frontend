'use client';
import { useState } from "react";

const allData = [
    {
        year: 2024,
        reports: [
            { id: 1, title: "Fund Manager Report - December-2024", link: "#" },
            { id: 2, title: "Fund Manager Report - November-2024", link: "#" },
            { id: 3, title: "Fund Manager Report - October-2024", link: "#" },
            // Add more reports for the year 2024
        ],
    },
    {
        year: 2023,
        reports: [
            { id: 1, title: "Fund Manager Report - December-2023", link: "#" },
            { id: 2, title: "Fund Manager Report - November-2023", link: "#" },
            // Add more reports for the year 2023
        ],
    },
    {
        year: 2022,
        reports: [
            { id: 1, title: "Fund Manager Report - December-2022", link: "#" },
            // Add more reports for the year 2022
        ],
    },
    // Add more years with reports
];


const fundReport = () => {
    const [data, setData] = useState(allData.slice(0, 10)); // Initially display 10 years of data
    const [expandedYears, setExpandedYears] = useState({});
    const [nextIndex, setNextIndex] = useState(10); // Track the next set of years to load

    const toggleYear = (year) => {
        setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
    };

    const loadMore = () => {
        const moreData = allData.slice(nextIndex, nextIndex + 10); // Get the next 10 years
        setData((prev) => [...prev, ...moreData]);
        setNextIndex((prev) => prev + 10);
    };
    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Fund Manager Reports</h1>
                <div className="space-y-4">
                    {data.map((yearData) => (
                        <div key={yearData.year}>
                            {/* Year Header */}
                            <div
                                className={`flex justify-between items-center px-4 py-2 cursor-pointer shadow ${expandedYears[yearData.year]
                                    ? "bg-primary text-white"
                                    : "bg-white text-primary "
                                    }`}
                                onClick={() => toggleYear(yearData.year)}
                            >
                                <span>{yearData.year}</span>
                                {/* <span>{expandedYears[yearData.year] ? "▲" : "▼"}</span> */}
                                <span>
                {expandedYears[yearData.year] ? (
                  <img
                    src="/assets/wite-arrowdown.png" // Replace with your "arrow up" icon path
                    alt="Arrow Up"
                    className=""
                  />
                ) : (
                  <img
                    src="/assets/faqarrowup.png" // Replace with your "arrow down" icon path
                    alt="Arrow Down"
                    className=" "
                  />
                )}
              </span>
                            </div>

                            {/* Reports for the Year */}
                            {expandedYears[yearData.year] && (
                                <div className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {yearData.reports.map((report) => (
                                            <div
                                                key={report.id}
                                                className="flex items-center justify-between border-b border-primary pb-4 "
                                            >
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/assets/pdf-img.png"
                                                        alt="PDF Icon"
                                                        className=""
                                                    />
                                                    <span>{report.title}</span>
                                                </div>
                                                <a
                                                    href={report.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-awtgreen p-5 -mb-4"
                                                >
                                                    <img src="/assets/download-icon.png" alt="" />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4">
                {/* Load More Button */}
                {nextIndex < allData.length && (
                    <button
                        onClick={loadMore}
                        className=" bg-awtgreen text-white px-6 py-2 w-1/3 rounded"
                    >
                        View More
                    </button>
                )}
                </div>
            </div>
        </>
    )
}

export default fundReport
