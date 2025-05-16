"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const DividendHistory = () => {
    const { i18n } = useTranslation();
    const [divData, setDivData] = useState([]);
    const [filteredDividends, setFilteredDividends] = useState([]);
    const [visibleDividends, setVisibleDividends] = useState([]);
    const [products, setProducts] = useState([]);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [selectedProduct, setSelectedProduct] = useState("");
    const [loadedCount, setLoadedCount] = useState(10);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState("");

    const RECORDS_PER_LOAD = 10;

    const parseBackendDate = (dateString: any) => {
        if (!dateString) return null;
        const [year, month, day] = dateString.split("-"); // Backend format: yyyy-mm-dd
        return new Date(year, month - 1, day); // Month is 0-based in JS Date
    };

    const formatDateForDisplay = (dateString: any) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontdividend/his`);
                setDivData(response.data);
                const uniqueProducts = [...new Set(
                    response.data
                        .map((div: any) => div.product?.replace(/<[^>]*>/g, "").trim())
                        .filter(Boolean)
                )];
                setProducts(uniqueProducts);
            } catch (error) {
                console.error("Error fetching Dividend data:", error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = () => {
        console.log("handleFilter triggered");
        setHasSubmitted(true);
        setLoading(true);
        setDateError("");

        if (!selectedProduct || !dateRange.from || !dateRange.to) {
            setDateError(`Please select ${!selectedProduct ? "Product" : ""} ${!selectedProduct && (!dateRange.from || !dateRange.to) ? "and" : ""} ${!dateRange.from || !dateRange.to ? "Date Range" : ""}`);
            setFilteredDividends([]);
            setVisibleDividends([]);
            setLoading(false);
            console.warn("Missing filters: Product or Date Range");
            return;
        }

        console.log("Filtering by Product:", selectedProduct);
        console.log("Filtering by Date Range: From", dateRange.from, "To", dateRange.to);
        console.log("Total Records Before Filtering:", divData.length);

        let filtered = divData.filter((div:any) => {
            const productMatch = div?.product?.replace(/<[^>]*>/g, "").trim() === selectedProduct;
            if (!productMatch) console.log("Product Mismatch:", div?.product);
            return productMatch;
        });
        console.log("After Product Filtering:", filtered.length);

        if (dateRange.from && dateRange.to) {
            const fromDate = new Date(dateRange.from);
            const toDate = new Date(dateRange.to);
            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(23, 59, 59, 999);

            filtered = filtered.filter((div:any) => {
                if (!div.announcementdate) {
                    console.warn("Skipping record with missing announcementdate:", div);
                    return false;
                }
                const divDate = new Date(div.announcementdate);
                divDate.setHours(0, 0, 0, 0);
                const withinRange = divDate >= fromDate && divDate <= toDate;
                if (!withinRange) console.log("Date Out of Range:", div.announcementdate);
                return withinRange;
            });
            console.log("After Date Filtering:", filtered.length);
        }

        setFilteredDividends(filtered);
        setVisibleDividends(filtered.slice(0, RECORDS_PER_LOAD));
        setLoadedCount(RECORDS_PER_LOAD);
        setLoading(false);
        console.log("Final Filtered Data:", filtered);
    };

    const handleLoadMore = () => {
        const nextRecords = filteredDividends.slice(0, loadedCount + RECORDS_PER_LOAD);
        setVisibleDividends(nextRecords);
        setLoadedCount(loadedCount + RECORDS_PER_LOAD);
    };

    return (
        <div className="container">
            <div className="mt-6">
                {/* Filter Section */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex flex-col w-full sm:w-1/3">
                        <label className="text-sm font-semibold mb-1">Fund Name</label>
                        <select
                            className="border border-gray-300 rounded p-2 text-sm"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map((product, index) => (
                                <option key={index} value={product}>{product}</option>
                            ))}
                        </select>
                    </div>

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
                            min={dateRange.from}
                            value={dateRange.to}
                            onChange={(e) => {
                                if (dateRange.from && new Date(e.target.value) < new Date(dateRange.from)) {
                                    setDateError("To date cannot be earlier than From date.");
                                    setDateRange({ ...dateRange, to: "" }); // Reset invalid date
                                } else {
                                    setDateError("");
                                    setDateRange({ ...dateRange, to: e.target.value });
                                }
                            }}

                        />
                    </div>

                    <button
                        className="w-full sm:w-1/3 bg-primary text-white rounded px-6 py-2 mt-auto"
                        onClick={handleFilter}
                    >
                        Submit
                    </button>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-primary text-white text-xs">
                            <tr className="text-center">
                                <th className="px-4 py-2">{i18n.language === 'en' ? "Month" : "مہینہ"}</th>
                                <th className="px-4 py-2">{i18n.language === 'en' ? "Announcement Date" : "اعلان کی تاریخ"}</th>
                                <th className="px-4 py-2">{i18n.language === 'en' ? "Cash Dividend**(Rs.)" : "کیش ڈیویڈنڈ**(روپے)"}</th>
                                <th className="px-4 py-2">{i18n.language === 'en' ? "Units Hold As On" : "یونٹس برقرار ہیں"}</th>
                                <th className="px-4 py-2">{i18n.language === 'en' ? "Ex-Bonus Price (Rs.)" : "سابق بونس کی قیمت (روپے)"}</th>
                                <th className="px-4 py-2">{i18n.language === 'en' ? "Year Ending" : "ٹرسٹی فیس"}</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs text-center">
                            {loading ? (
                                <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
                            ) : dateError ? (
                                <tr><td colSpan={6} className="px-4 py-6 text-center text-red-500">
                                    {dateError}
                                </td></tr>
                            ) : !selectedProduct || !dateRange.from || !dateRange.to ? (
                                <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    Please select {!selectedProduct ? "Product" : ""}
                                    {(!selectedProduct && (!dateRange.from || !dateRange.to)) ? " and " : ""}
                                    {!dateRange.from || !dateRange.to ? "Date Range" : ""}
                                </td></tr>
                            ) : hasSubmitted && visibleDividends.length === 0 ? (
                                <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    No Record Found
                                </td></tr>
                            ) : (
                                visibleDividends.map((div: any, index: any) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                        <td className="px-4 py-2">{div.month}</td>
                                        <td className="px-4 py-2">{formatDateForDisplay(div?.announcementdate)}</td>
                                        <td className="px-4 py-2">{div?.dividendcash}</td>
                                        <td className="px-4 py-2">{formatDateForDisplay(div?.units)}</td>
                                        <td className="px-4 py-2">{div?.exbonus}</td>
                                        <td className="px-4 py-2">{formatDateForDisplay(div?.yearedning)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Load More Button */}
                {visibleDividends.length > 0 && visibleDividends.length < filteredDividends.length && (
                    <button
                        className="bg-primary text-white rounded px-6 py-2 mt-6"
                        onClick={handleLoadMore}
                    >
                        View More
                    </button>
                )}
            </div>
        </div>
    );
};

export default DividendHistory;
