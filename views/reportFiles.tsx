'use client';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Image from "next/image";

const FundReport = ({ sectionData }: any) => {
    const [data, setData] = useState([]); // State to hold the API response
    const [expandedYears, setExpandedYears] = useState({} as any); // Tracks expanded years
    const [nextIndex, setNextIndex] = useState(10); // Tracks the next set of years to load
    const { i18n } = useTranslation();

    // Toggle expanded state for years
    const toggleYear = (year: any) => {
        setExpandedYears((prev: any) => ({ ...prev, [year]: !prev[year] }));
    };

    // Load more data dynamically
    const loadMore = () => {
        setNextIndex((prev) => prev + 10);
    };

    // Fetch data from the API
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontdownload`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching downloads:", error);
            });
    }, []);

    // Paginate the data (e.g., load 10 items at a time)
    const paginatedData = data.slice(0, nextIndex);

    return (
        <div className="container mx-auto md:px-0 px-4 py-3">
            <h1
                className="text-3xl sm:text-4xl heading-title mb-4"
                dangerouslySetInnerHTML={{
                    __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu,
                }}
            ></h1>
            <div className="space-y-4">
                {paginatedData.map((yearData: any) => (
                    <div key={yearData.year}>
                        {/* Year Header */}
                        <div
                            className={`flex justify-between items-center px-4 py-2 cursor-pointer shadow ${expandedYears[yearData.year]
                                ? "bg-primary  font-semibold text-white"
                                : "bg-white text-primary"
                                }`}
                            onClick={() => toggleYear(yearData.year)}
                        >
                            <span>{yearData.year}</span>
                            <span>
                                {expandedYears[yearData.year] ? (
                                    <Image
                                        src="/assets/wite-arrowdown.png"
                                        alt="Arrow Up"
                                        className=""
                                        width={35}
                                        height={35}
                                    />
                                ) : (
                                    <Image
                                        src="/assets/faqarrowup.png"
                                        alt="Arrow Down"
                                        className=""
                                        width={35}
                                        height={35}
                                    />
                                )}
                            </span>
                        </div>

                        {/* Reports for the Year */}
                        {expandedYears[yearData.year] && (
                            <div className="mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {yearData?.downloads?.map((report: any) => (
                                        <div
                                            key={report.id}
                                            className="flex items-center justify-between border-b border-primary pb-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src="/assets/pdf-img.png"
                                                    alt="PDF Icon"
                                                    className=""
                                                    width={35}
                                                    height={35}

                                                />
                                                <span className="text-base">{i18n.language === 'en' ? report?.title : report?.title_urdu}</span>
                                            </div>
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_Image_Path
                                                    }/files/${i18n.language === 'en' ? report?.file : report?.file_urdu}
                                  `}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-awtgreen p-5 -mb-4"
                                            >
                                                <Image src="/assets/download-icon.png"
                                                    alt=""
                                                    width={25}
                                                    height={25}
                                                />
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
                {nextIndex < data.length && (
                    <button
                        onClick={loadMore}
                        className="bg-awtgreen text-sm font-medium text-white px-6 py-3 w-1/3 rounded"
                    >
                        {i18n.language === 'en' ? "View More" : "مزید دیکھیں"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FundReport;
