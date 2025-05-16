"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const NavHistory = () => {
  const { i18n } = useTranslation();
  const [navData, setNavData] = useState([]);
  const [visibleNavs, setVisibleNavs] = useState([]);
  const [filteredNavs, setFilteredNavs] = useState([]);
  const [products, setProducts] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loadedCount, setLoadedCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [dateError, setDateError] = useState("");
  const [productTitle, setProductTitle] = useState("");

  const RECORDS_PER_LOAD = 20;



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend.awtinvestments.com/api/v1/uniqueproducts/title`);
        // const uniqueProducts: any = [...new Set(
        //   response.data
        //     .map((title: any) => title?.replace(/<[^>]*>/g, "").trim())
        //     .filter((product: any) => product)
        // )];
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Product Title:", error);
      }
    };
    fetchData();
  }, []);


  const handleFilter = async () => {
    setLoading(true);
    setNoData(false);
    setDateError("");

    if (!selectedProduct || !dateRange.from || !dateRange.to) {
      setNavData([]);
      setFilteredNavs([]);  // Reset filteredNavs too
      setNoData(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`https://backend.awtinvestments.com/api/v1/frontnav`, {
        params: {
          product: selectedProduct,
          from: dateRange.from, // Use raw string dates
          to: dateRange.to,
        },
      });

      const fetchedData = response.data.data || [];
      const fetchedProductTitle = response.data.product || "";

      setNavData(fetchedData);
      setProductTitle(fetchedProductTitle);
      setFilteredNavs(fetchedData); // Store the full dataset
      setLoadedCount(RECORDS_PER_LOAD);

      if (fetchedData.length === 0) {
        setNoData(true);
      }
    } catch (error) {
      console.error("Error fetching NAV data:", error);
    }

    setLoading(false);
  };

  // Ensure visibleNavs updates when navData changes
  useEffect(() => {
    setVisibleNavs(navData.slice(0, RECORDS_PER_LOAD));
  }, [navData]);

  const handleLoadMore = () => {
    const nextRecords = navData.slice(0, loadedCount + RECORDS_PER_LOAD);
    setVisibleNavs(nextRecords);
    setLoadedCount(loadedCount + RECORDS_PER_LOAD);
  };

  return (
    <div className="container">
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="text-sm font-semibold mb-1">Product Name</label>
            <select
              className="border border-gray-300 rounded p-2 text-sm"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((product, index) => (
                <option key={index} value={product}>{product.replace(/<[^>]*>/g, "").trim()}</option>
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
              value={dateRange.to}
              min={dateRange.from}
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
          <button className="w-full sm:w-1/3 bg-primary text-white rounded px-6 py-2 mt-auto" onClick={handleFilter}>
            Submit
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-primary text-white text-xs">
              <tr className="text-center">
                <th className="px-4 py-2 ">{i18n.language === 'en' ? "fund" : "فنڈ"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Offer Price (Rs.)" : "پیشکش کی قیمت (روپے)"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Redemption Price (Rs.)" : "چھٹکارے کی قیمت (روپے)"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "EXP Ratio (%)" : "(%) اخراجات کا تناسب"}</th>
                <th className="px-4 py-2" style={{ width: "100px" }}>{i18n.language === 'en' ? "Applicable Date" : "قابل اطلاق تاریخ"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Management Fee (%)" : "(%) مینجمنٹ فیس"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Selling & Marketing Expenses (%)" : "(%) فروخت اور مارکیٹنگ کے اخراجات"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Front-End Load (%)" : "(%) فرنٹ اینڈ لوڈ"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Back-end Load (%)" : "(%) بیک اینڈ لوڈ"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Contingent Load (%)" : "(%) کنٹیجینٹ لوڈ"}</th>
                <th className="px-4 py-2">{i18n.language === 'en' ? "Trustee Fee (%)" : "(%) ٹرسٹی فیس"}</th>
              </tr>
            </thead>
            <tbody className="text-xs text-center">
              {loading ? (
                <tr><td colSpan={12} className="text-center py-4">Loading...</td></tr>
              ) : dateError ? (
                <tr><td colSpan={12} className="px-4 py-6 text-center text-red-500">
                  {dateError}
                </td></tr>
              ) : !selectedProduct || !dateRange.from || !dateRange.to ? (
                <tr><td colSpan={12} className="px-4 py-6 text-center font-medium text-gray-900">
                  Please select {!selectedProduct ? "Product" : ""} {(!selectedProduct && (!dateRange.from || !dateRange.to)) ? "and" : ""}
                  {!dateRange.from || !dateRange.to ? " Date Range" : ""}
                </td></tr>
              ) : noData ? (
                <tr><td colSpan={12} className="px-4 py-6 text-center font-medium text-gray-900">
                  No Record Found
                </td></tr>
              ) : (
                visibleNavs.map((nav: any, index: any) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="px-4 py-2" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? productTitle : productTitle }}></td>
                    <td className="px-4 py-2">{nav.offer || "-"}</td>
                    <td className="px-4 py-2">{nav.redemption || "-"}</td>
                    <td className="px-4 py-2">{nav.exp_ratio || "0"}</td>
                    <td className="px-4 py-2" style={{ width: "120px" }}>{nav.date || ""}</td>
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

        {!loading && !noData && visibleNavs.length < filteredNavs.length && (
          <button className="bg-primary text-white rounded px-6 py-2 mt-6" onClick={handleLoadMore}>
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default NavHistory;
