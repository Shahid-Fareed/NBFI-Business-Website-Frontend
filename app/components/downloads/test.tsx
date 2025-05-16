'use client';
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import axios from "axios";

const FundReport = ({ Slug, ProductSlug }: any) => {
    const [nextIndex, setNextIndex] = useState(10); 
    const [nextDownloadIndex, setNextDownloadIndex] = useState(20); 
    const { i18n } = useTranslation();
    const [Files, setFiles] = useState([]);
    const [Downloads, setDownloads] = useState([]);
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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

    
    const loadMore = () => {
        if (Files.length > 0) {
           
            setNextIndex((prev) => Math.min(prev + 10, Files.length));
        } else {
            
            setNextDownloadIndex((prev) => Math.min(prev + 10, Downloads.length));
        }
    };

    const paginatedFiles = Files.slice(0, nextIndex);
    const paginatedDownloads = Downloads.slice(0, nextDownloadIndex);

    return (
        <div className="container mx-auto md:px-0 px-4 py-3">
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : Files.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {paginatedFiles.map((fileGroup: any, index: any) => (
                            <div key={index}>
                                <div
                                    className={`flex justify-between items-center px-4 py-2 cursor-pointer shadow ${
                                        expandedProduct === fileGroup.product
                                            ? "bg-primary font-semibold text-white"
                                            : "bg-white text-primary"
                                    }`}
                                    onClick={() =>
                                        setExpandedProduct(
                                            expandedProduct === fileGroup.product ? null : fileGroup.product
                                        )
                                    }
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: i18n.language === "en" ? fileGroup.product : fileGroup.product,
                                        }}
                                    ></span>
                                    <span>
                                        {expandedProduct === fileGroup.product ? (
                                            <Image src="/assets/wite-arrowdown.png" alt="Arrow Up" width={35} height={35} />
                                        ) : (
                                            <Image src="/assets/faqarrowup.png" alt="Arrow Down" width={35} height={35} />
                                        )}
                                    </span>
                                </div>

                                {/* Show files inside accordion */}
                                {expandedProduct === fileGroup.product && (
                                    <div className="mt-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {fileGroup.files.map((report: any) => (
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
                                                            {i18n.language === "en"
                                                                ? report?.title
                                                                : report?.title_urdu}
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={`${process.env.NEXT_PUBLIC_Image_Path}/files/${
                                                            i18n.language === "en" ? report?.file : report?.file_urdu
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
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                // If Files is empty, show Downloads directly (without accordion)
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
                                href={`${process.env.NEXT_PUBLIC_Image_Path}/files/${
                                    i18n.language === "en" ? report?.file : report?.file_urdu
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
