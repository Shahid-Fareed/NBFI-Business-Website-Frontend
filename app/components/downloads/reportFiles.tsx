'use client';
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import axios from "axios";

const FundReport = ({ Slug, ProductSlug, ID }: any) => {
    const [nextDownloadIndex, setNextDownloadIndex] = useState(20);
    const [nextIndex, setNextIndex] = useState(20);
    const { i18n } = useTranslation();
    const [Files, setFiles] = useState([]);
    const [Downloads, setDownloads] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const downloadSlug = Slug.split("/").pop();
    const queryParam = ProductSlug ? `?productSlug=${ProductSlug}` : "";

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontdownload/files/${downloadSlug}${queryParam}`);
                setFiles(response.data.files);
                setDownloads(response.data.downloads);
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [downloadSlug, queryParam]);



    useEffect(() => {
        if (Object.keys(subcategoryGroups).length > 0) {
            setActiveTab(Object.keys(subcategoryGroups)[0]);
        }
    }, [Downloads]);

    const loadMore = () => {
        if (Files.length > 0) {

            setNextIndex((prev) => Math.min(prev + 10, Files.length));
        } else {

            setNextDownloadIndex((prev) => Math.min(prev + 10, Downloads.length));
        }
    };

    const paginatedFiles = Files.slice(0, nextIndex);
    const paginatedDownloads = Downloads.slice(0, nextDownloadIndex);

    // Group downloads by subcategory, filtering out undefined subcategories
    const subcategoryGroups = paginatedDownloads.reduce((acc, file) => {
        if (file.subcategory) {
            if (!acc[file.subcategory]) acc[file.subcategory] = [];
            acc[file.subcategory].push(file);
        }
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="container mx-auto md:px-0 px-4 py-3">
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : Files.length > 0 ? (
                <div className="space-y-4">
                    {paginatedFiles.slice(0, nextIndex).map((fileGroup: any, index: any) => (
                        <div key={index}>
                            <div
                                className={`flex justify-between items-center px-4 py-2 cursor-pointer shadow ${expandedProduct === fileGroup.product
                                    ? "bg-primary font-semibold text-white"
                                    : "bg-white text-primary"
                                    }`}
                                onClick={() =>
                                    setExpandedProduct(expandedProduct === fileGroup.product ? null : fileGroup.product)
                                }
                            >
                                <span dangerouslySetInnerHTML={{
                                    __html: i18n.language === "en" ? fileGroup.product : fileGroup.product,
                                }}></span>
                                <span>
                                    <Image src={expandedProduct === fileGroup.product ? "/assets/wite-arrowdown.png" : "/assets/faqarrowup.png"}
                                        alt="Arrow" width={35} height={35} />
                                </span>
                            </div>

                            {expandedProduct === fileGroup.product && (
                                <div className="mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {fileGroup.files.map((report: any) => (
                                            <div key={report.id} className="flex items-center justify-between border-b border-primary pb-4">
                                                <div className="flex items-center gap-2">
                                                    <Image src="/assets/pdf-img.png" alt="PDF Icon" width={35} height={35} />
                                                    <span className="text-base">
                                                        {i18n.language === "en" ? report?.title : report?.title_urdu}
                                                    </span>
                                                </div>
                                                <a href={`${process.env.NEXT_PUBLIC_Image_Path}/files/${i18n.language === "en" ? report?.file : report?.file_urdu}`}
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="bg-awtgreen p-5 -mb-4">
                                                    <Image src="/assets/download-icon.png" alt="Download" width={25} height={25} />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {ID === 2 && Object.keys(subcategoryGroups).length > 0 ? (
                        <>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 border-b-4 border-gray-200 mb-4 relative">
                                {/* Three small bars under the tabs */}
                                <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                                    <span className="w-4 h-1 bg-primary"></span>
                                    <span className="w-4 h-1 bg-[#946B29]"></span>
                                    <span className="w-4 h-1 bg-awtgreen"></span>
                                </div>

                                {Object.keys(subcategoryGroups)
                                    .filter((subcategory) => subcategory) // Ensure subcategory is not undefined
                                    .map((subcategory, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTab(subcategory)}
                                            className={`py-2 -mb-1 text-md md:text-xl transition-colors duration-300 bg-transparent border-0 rounded-none text-primary hover:text-primary hover:border-b-4 hover:border-primary focus:outline-none ${activeTab === subcategory ? "border-b-4 border-primary" : "hover:border-b-primary"
                                                }`}
                                        >
                                            {i18n.language === "en" ? subcategory : subcategory}
                                        </button>
                                    ))}
                            </div>

                            {activeTab && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {subcategoryGroups[activeTab]?.map((report: any) => (
                                        <div key={report.id} className="flex items-center justify-between border-b border-primary pb-4">
                                            <div className="flex items-center gap-2">
                                                <Image src="/assets/pdf-img.png" alt="PDF Icon" width={35} height={35} />
                                                <span className="text-base">
                                                    {i18n.language === "en" ? report?.title : report?.title_urdu}
                                                </span>
                                            </div>
                                            <a href={`${process.env.NEXT_PUBLIC_Image_Path}/files/${i18n.language === "en" ? report?.file : report?.file_urdu}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="bg-awtgreen p-5 -mb-4">
                                                <Image src="/assets/download-icon.png" alt="Download" width={25} height={25} />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {paginatedDownloads.map((report: any) => (
                                <div
                                    key={report.id}
                                    className="flex items-center justify-between border-b border-primary pb-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/assets/pdf-img.png"
                                            alt="PDF Icon"
                                            width={35}
                                            height={35}
                                        />
                                        <span className="text-base">
                                            {i18n.language === "en" ? report?.title : report?.title_urdu}
                                        </span>
                                    </div>
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_Image_Path}/files/${i18n.language === "en" ? report?.file : report?.file_urdu
                                            }`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-awtgreen p-5 -mb-4"
                                    >
                                        <Image src="/assets/download-icon.png" alt="Download" width={25} height={25} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Load More Button (works for both files & downloads) */}
            {((Files.length > 0 && nextIndex < Files.length) || (Files.length === 0 && nextDownloadIndex < Downloads.length)) && (
                <div className="text-center mt-4">
                    <button
                        onClick={loadMore}
                        className="bg-awtgreen text-sm font-medium text-white px-6 py-3 w-1/3 rounded"
                    >
                        {i18n.language === "en" ? "View More" : "مزید دیکھیں"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FundReport;
