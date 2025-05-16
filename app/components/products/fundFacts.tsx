"use client";
import React, { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from 'react-i18next';
import Link from "next/link";
import axios from "axios"

const FundFacts = ({ Factscard, Slug, Productcode, FileCategory }: any) => {
    const { i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState("Fund Facts");
    const [Nav, setNav] = useState([]);
    const [DownloadCategory, setDownloadCategory] = useState([]);
    const [filteredNavs, setFilteredNavs] = useState(Nav || []);
    const [visibleNavs, setVisibleNavs] = useState(Nav.slice(0, 10));
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [loadedCount, setLoadedCount] = useState(10);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontproduct/nav/${Productcode}`)
            .then((response) => {
                const apiData = response.data;
                setNav(apiData);
                setFilteredNavs(apiData);
                setVisibleNavs(apiData.slice(0, 10));
            })
            .catch((error) => {
                console.error("Error fetching NAVs:", error);
            }).finally(() => setLoading(false));
    }, [Productcode]);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontproduct/categories/${Slug}`)
            .then((response) => {
                const apiData = response.data.downloadCategories;

                const filteredCategories = apiData.filter((category: any) =>
                    FileCategory.includes(String(category.id))
                );

                setDownloadCategory(filteredCategories);
            })
            .catch((error) => {
                console.error("Error fetching Download Categories:", error);
            });
    }, [Slug, FileCategory]);


    const handleFilter = () => {
        let filtered = Nav;

        if (dateRange.from && dateRange.to) {
            const fromDate = new Date(dateRange.from);
            const toDate = new Date(dateRange.to);

            filtered = Nav.filter((nav: any) => {
                if (!nav.date) return false; // Skip if date is missing
                const navDate = new Date(nav.date);
                return navDate >= fromDate && navDate <= toDate;
            });
        }

        setFilteredNavs(filtered);
        setVisibleNavs(filtered.slice(0, 10));
        setLoadedCount(10);
    };

    const handleLoadMore = () => {
        const nextCount = loadedCount + 10;
        setVisibleNavs(filteredNavs.slice(0, nextCount));
        setLoadedCount(nextCount);
    };

    const tabs = ["Fund Facts", "Price History"];

    const colors = ["bg-awtgreen", "bg-[#946B29]", "bg-primary"];

    const formatDateForDisplay = (dateString: string) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('/');
        return `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
    };

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
                        {Factscard?.map((cv: any, index: any) => (
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
                                    <p className="font-semibold text-base">{i18n.language === 'en' ? cv?.subtitle : cv?.subtitle_urdu}</p>
                                    <h3 className="text-2xl">{i18n.language === 'en' ? cv?.title : cv?.title_urdu}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? cv?.description : cv?.description_urdu }}></p>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                        {DownloadCategory.map((category: any, index: any) => (
                            <div key={index} className={`${colors[index % colors.length]} p-6 `}>
                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <h3 className="text-base text-white font-semibold" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? category?.title : category?.title_urdu }}>
                                        </h3>
                                    </div>
                                    <Link href={`/downloads/${category?.slug}?productSlug=${Slug}`}>
                                        <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                        {FileCategory.map((category: string) => {
                            const categoryId = Number(category); // Convert string to number

                            return (
                                <>
                                    {categoryId === 8 && (
                                        <div key="key-policies" className="bg-awtgreen p-6">
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <h3
                                                        className="text-base text-white font-semibold"
                                                        dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? "Key Policies" : "کلیدی پالیسیاں" }}
                                                    />
                                                </div>
                                                <Link href={`/downloads/key-policies`}>
                                                    <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {categoryId === 6 && (
                                        <div key="financial-statements" className="bg-[#946B29] p-6">
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <h3
                                                        className="text-base text-white font-semibold"
                                                        dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? "Financial Statements" : "مالی بیانات" }}
                                                    />
                                                </div>
                                                <Link href={`/downloads/financial-statements`}>
                                                    <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {categoryId === 2 && (
                                        <div key="application-forms" className="bg-primary p-6">
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <h3
                                                        className="text-base text-white font-semibold"
                                                        dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? "Application Forms" : "درخواست فارم" }}
                                                    />
                                                </div>
                                                <Link href={`/downloads/application-forms`}>
                                                    <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {categoryId === 7 && (
                                        <div key="shariah-documents" className="bg-awtgreen p-6">
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <h3
                                                        className="text-base text-white font-semibold"
                                                        dangerouslySetInnerHTML={{ __html: i18n.language === "en" ? "Shariah Documents" : "شرعی دستاویزات" }}
                                                    />
                                                </div>
                                                <Link href={`/downloads/shariah-documents`}>
                                                    <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl " />
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </div>


                </>
            )}

            {activeTab === "Price History" && (
                <div>
                    <div className="mt-6">
                        {/* Date Picker */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex flex-col w-full sm:w-1/3">
                                <label className="text-sm font-semibold mb-1">From</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded p-2 text-sm"
                                    value={dateRange.from}
                                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col w-full sm:w-1/3">
                                <label className="text-sm font-semibold mb-1">To</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded p-2 text-sm"
                                    value={dateRange.to}
                                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                />
                            </div>
                            <button
                                className="w-full sm:w-1/3 bg-primary text-white rounded px-6 py-2 mt-auto"
                                onClick={handleFilter}
                            >
                                Submit
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-collapse">
                                <thead className="bg-primary text-white text-xs">
                                    <tr>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Offer Price (Rs.)" : "پیشکش کی قیمت (روپے)"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Redemption Price (Rs.)" : "چھٹکارے کی قیمت (روپے)"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "EXP Ratio" : "اخراجات کا تناسب"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Applicable Date" : "قابل اطلاق تاریخ"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Management Fee" : "مینجمنٹ فیس"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Selling & Marketing Expenses" : "فروخت اور مارکیٹنگ کے اخراجات"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Front-End Load" : "فرنٹ اینڈ لوڈ"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Back-end Load" : "بیک اینڈ لوڈ"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Contingent Load" : "کنٹیجینٹ لوڈ"}</th>
                                        <th className="px-4 py-2">{i18n.language === 'en' ? "Trustee Fee" : "ٹرسٹی فیس"}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xs">
                                    {loading ? (
                                        <tr><td colSpan={12} className="text-center py-4">Loading...</td></tr>
                                    ) : (
                                        visibleNavs.map((nav: any, index: number) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                <td className="px-4 py-2">{nav.offer || "-"}</td>
                                                <td className="px-4 py-2">{nav.redemption || "-"}</td>
                                                <td className="px-4 py-2">{nav.exp_ratio || "0"}</td>
                                                <td className="px-4 py-2">{nav.date}</td>
                                                <td className="px-4 py-2">{nav.managementfee || "-"}</td>
                                                <td className="px-4 py-2">{nav.marketingexpenses || "-"}</td>
                                                <td className="px-4 py-2">{nav.frontendload || "0"}</td>
                                                <td className="px-4 py-2">{nav.backendload || "0"}</td>
                                                <td className="px-4 py-2">{nav.contingentload || "0"}</td>
                                                <td className="px-4 py-2">{nav.trusteefee || "-"}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* View More Button */}
                        {visibleNavs.length < filteredNavs.length && (
                            <button
                                className="bg-primary text-white rounded px-6 py-2 mt-6"
                                onClick={handleLoadMore}
                            >
                                View More
                            </button>
                        )}
                    </div>


                </div>
            )}

        </div>
    );
};

export default FundFacts;
