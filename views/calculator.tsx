"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const FinancialCalculators = () => {
    const [activeTab, setActiveTab] = useState("future");
    const [formData, setFormData] = useState({
        frequency: "12",
        periods: "",
        years: "",
        initialInvestment: "",
        regularInvestment: "",
        annualRate: "",
        targetAmount: "",
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        if (window.location.hash === "#regular") {
            setActiveTab("regular");
        }
    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            periods: prevData.frequency
        }));
    }, [formData.frequency]);

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
        setResult(null);
        setResponseMessage("");
        window.location.hash = tab === "regular" ? "#regular" : "#future";
    };

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
    
        // Prevent negative values
        if (parseFloat(value) < 0) return;
    
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const resetForm = () => {
        setFormData((prevData) => ({
            ...prevData,
            years: "",
            initialInvestment: "",
            regularInvestment: "",
            annualRate: "",
            targetAmount: "",
        }));
    };

    // const handleFormSubmit = async (e: any, type: any) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setResponseMessage("");
    //     setResult(null);

    //     try {
    //         const endpoint =
    //             type === "future"
    //                 ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/calculator/futurevalue`
    //                 : `${process.env.NEXT_PUBLIC_BACKEND_URI}/calculator/regularamount`;

    //         const response = await axios.post(endpoint, formData);

    //         if (type === "future") {
    //             setResult(`Future Value: ${response.data.futureValue}`);
    //         } else {
    //             setResult(`Required Regular Investment: ${response.data.regularInvestment}`);
    //         }
    //         setResponseMessage("Calculation successful!");
    //         resetForm();
    //     } catch (error) {
    //         setResponseMessage(
    //             error.response?.data?.error || "An error occurred while calculating."
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleFormSubmit = async (e: any, type: any) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");
        setResult(null);
    
        try {
            const endpoint =
                type === "future"
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/calculator/futurevalue`
                    : `${process.env.NEXT_PUBLIC_BACKEND_URI}/calculator/regularamount`;
    
            const response = await axios.post(endpoint, formData);
    
            // Format the number with commas
            const formatNumber = (num: number) =>
                new Intl.NumberFormat("en-IN").format(num);
    
            if (type === "future") {
                setResult(`Future Value: ${formatNumber(response.data.futureValue)}`);
            } else {
                setResult(`Required Regular Investment: ${formatNumber(response.data.regularInvestment)}`);
            }
            setResponseMessage("Calculation successful!");
            resetForm();
        } catch (error) {
            setResponseMessage(
                error.response?.data?.error || "An error occurred while calculating."
            );
        } finally {
            setLoading(false);
        }
    };
    
    const frequencyOptions = [
        { label: "Monthly", value: 12 },
        { label: "Quarterly", value: 4 },
        { label: "Semi-Annually", value: 2 },
        { label: "Annually", value: 1 },
    ];

    const renderInputField = (label: any, name: any, placeholder: any, type = "number") => (
        <div className="flex flex-col">
            <label className="mb-1 font-medium text-primary">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                className="p-2 border rounded"
                required
            />
        </div>
    );

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Tabs */}
            <div className="flex border-b-4 gap-7 mb-6 relative">
                <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                    <span className="w-4 h-1 bg-primary"></span>
                    <span className="w-4 h-1 bg-[#946B29]"></span>
                    <span className="w-4 h-1 bg-awtgreen"></span>
                </div>
                <button
                    className={`bg-transparent border-0 rounded-none -mb-1 py-2 text-primary focus:outline-none font-medium ${activeTab === "future"
                        ? "border-b-4 border-primary "
                        : ""
                        }`}
                    onClick={() => handleTabChange("future")}
                >
                    Future Value Calculator
                </button>
                <button
                    className={`bg-transparent border-0 rounded-none -mb-1 py-2 text-primary focus:outline-none font-medium ${activeTab === "regular"
                        ? "border-b-4 border-primary"
                        : ""
                        }`}
                    onClick={() => handleTabChange("regular")}
                >
                    Regular Investment Calculator
                </button>
            </div>

            {/* Forms */}
            {activeTab === "future" && (
                <form className="grid gap-4 md:grid-cols-3" onSubmit={(e) => handleFormSubmit(e, "future")}>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-primary">Frequency</label>
                        <select
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        >
                            {frequencyOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-primary">Periods</label>
                        <input
                            type="number"
                            name="periods"
                            value={formData.periods}
                            readOnly
                            className="p-2 border rounded bg-gray-100 text-gray-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-primary">Years</label>
                        <input
                            type="number"
                            name="years"
                            value={formData.years}
                            onChange={handleInputChange}
                            min="0"
                            placeholder='Enter years'
                            className="p-2 border rounded text-gray-700" required />
                    </div>
                    {/* {renderInputField("Periods", "periods", "Enter periods")} */}
                    {/* {renderInputField("Years", "years", "Enter years")} */}
                    {renderInputField("Initial Investment", "initialInvestment", "Enter initial investment")}
                    {renderInputField("Regular Investment", "regularInvestment", "Enter regular investment")}
                    {renderInputField("Annual Rate (%)", "annualRate", "Enter annual rate")}
                    <button
                        type="submit"
                        className="py-2 bg-awtgreen text-white rounded "
                        disabled={loading}
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>
                </form>
            )}

            {activeTab === "regular" && (
                <form className="grid gap-4 md:grid-cols-3" onSubmit={(e) => handleFormSubmit(e, "regular")}>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-primary">Frequency</label>
                        <select
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleInputChange}
                            className="p-2 border rounded"
                            required
                        >
                            {frequencyOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-primary">Periods</label>
                        <input
                            type="number"
                            name="periods"
                            value={formData.periods}
                            readOnly
                            className="p-2 border rounded bg-gray-100 text-gray-700"
                        />
                    </div>
                    <div className=' flex flex-col'>
                        <label className="mb-1 font-medium text-primary">Years</label>
                        <input
                            type="number"
                            name="years"
                            value={formData.years}
                            onChange={handleInputChange}
                            min="0"
                            placeholder='Enter years'
                            className="p-2 border rounded text-gray-700" required />
                    </div>
                    {/* {renderInputField("Periods", "periods", "Enter periods")} */}
                    {/* {renderInputField("Years", "years", "Enter years")} */}
                    {renderInputField("Target Amount", "targetAmount", "Enter target amount")}
                    {renderInputField("Initial Investment", "initialInvestment", "Enter initial investment")}
                    {renderInputField("Annual Rate (%)", "annualRate", "Enter annual rate")}
                    <button
                        type="submit"
                        className="py-2 bg-awtgreen text-white rounded"
                        disabled={loading}
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>
                </form>
            )
            }

            {
                responseMessage && (
                    <div className="mt-4 text-center text-awtgreen">{responseMessage}</div>
                )
            }
            {
                result && (
                    <div className="mt-4 text-center text-xl font-semibold text-primary">{result}</div>
                )
            }
        </div >
    );
};

export default FinancialCalculators;
