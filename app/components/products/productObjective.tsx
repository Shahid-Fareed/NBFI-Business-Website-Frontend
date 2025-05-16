"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"
import { useTranslation } from 'react-i18next';


const productObjective = ({ objective, Slug }: any) => {
    const { i18n } = useTranslation();
    const [Equity, setEquity] = useState<any>({});
    const [fixedIncome, setFixedIncome] = useState<any>({});
    const [latestDate, setLatestDate] = useState<any>("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontproduct/calculations/${Slug}`)
            .then((response) => {
                const apiData = response.data;
                console.log(apiData);
                setEquity(apiData.equityReturns);
                setFixedIncome(apiData.fixedIncomeReturns);
                setLatestDate(apiData.latestNavDate);
            })
            .catch((error) => {
                console.error("Error fetching Calculations:", error);
            })
            .finally(() => setLoading(false));
    }, [Slug]);



    return (
        <div className="container" >
            <div className="my-8 px-4 md:px-0">
                <div className={`grid gap-6 mt-8 ${objective?.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {objective?.map((objective: any, index: number) => (
                        <div key={index}>
                            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                                {i18n.language === 'en' ? objective?.title : objective?.title_urdu}
                            </h3>
                            <p className="text-base text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? objective?.description : objective?.description_urdu }}>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                {/* Equity Fund Section */}
                {Slug === "awt-islamic-stock-fund" || Slug === "awt-stock-fund" ? (
                    <div className="container mx-auto px-4 md:px-0 ">
                        <h2
                            className="text-2xl md:text-3xl text-black heading-title mb-4 text-center md:text-start"
                            dangerouslySetInnerHTML={{
                                __html: i18n.language === 'en' ? "Performance <b>Summary</b>" : "کارکردگی کا <b>خلاصہ</b>"
                            }}
                        ></h2>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-300 text-center text-xs">
                                <thead className="">
                                    <tr>
                                        <th className="px-4 py-2  bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "1 Day Return" : "1 دن کی واپسی۔"}</th>
                                        <th className="px-4 py-2  bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "15 Days Return" : "15 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2  bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "30 Days Return" : "30 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2  bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "90 Days Return" : "90 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "180 Days Return" : "180 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "1 Year Return" : "1 سال کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "2 Years Return" : "2 سال کی واپسی۔"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {loading ? (
                                        <tr><td colSpan={12} className="text-center py-4">Loading...</td></tr>
                                    ) : (
                                        <tr className="odd:bg-white even:bg-[#EBEBEB]">
                                            <td className="px-4 py-2 text-black">{Equity.onedayreturn}</td>
                                            <td className="px-4 py-2 text-black">{Equity.fifteendaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{Equity.thirtydaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{Equity.ninetydaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{Equity.oneeigthydaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{Equity.oneyearreturn}</td>
                                            <td className="px-4 py-2 text-black">{Equity.twoyearsreturn}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto px-4 md:px-0 ">
                        <h2
                            className="text-2xl md:text-3xl text-black heading-title mb-4 text-center md:text-start"
                            dangerouslySetInnerHTML={{
                                __html: i18n.language === 'en' ? "Performance <b>Summary</b>" : "کارکردگی کا <b>خلاصہ</b>"
                            }}
                        ></h2>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-300 text-center text-xs">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "1 Day Return" : "1 دن کی واپسی۔"}</th>
                                        <th className="px-4 py-2  bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "15 Days Return" : "15 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "30 Days Return" : "30 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "90 Days Return" : "90 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "180 Days Return" : "180 دن کی واپسی۔"}
                                        </th>
                                        <th className="px-4 py-2 bg-primary text-white font-semibold">
                                            {i18n.language === 'en' ? "365 Days Return" : "365 دن کی واپسی۔"}
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={12} className="text-center py-4">Loading...</td></tr>
                                    ) : (
                                        <tr className="odd:bg-white even:bg-[#EBEBEB]">
                                            <td className="px-4 py-2 text-black">{fixedIncome.onedayreturn}</td>
                                            <td className="px-4 py-2 text-black">{fixedIncome.fifteendaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{fixedIncome.thirtydaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{fixedIncome.ninetydaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{fixedIncome.oneeigthydaysreturn}</td>
                                            <td className="px-4 py-2 text-black">{fixedIncome.oneyearreturn}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-2">
                <p className="text-sm">Validity Date: <span className="font-semibold">{latestDate}</span></p>
            </div>

        </div>
    )
}

export default productObjective
