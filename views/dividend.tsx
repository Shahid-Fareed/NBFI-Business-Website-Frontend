import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import axios from "axios";

const parseBackendDate = (dateString:any) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-"); // Backend format: yyyy-mm-dd
    return new Date(`${year}-${month}-${day}`);
};

const formatDateForDisplay = (dateString:any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
};


const Dividend: FC = ({ sectionData, navs }: any) => {
    const { t, i18n } = useTranslation();
    const [dividend, setDividend] = useState([] as any);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontdividend`)
            .then((response) => {
                setDividend(response.data);
            })
            .catch((error) => {
                console.error("Error fetching dividends:", error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4 md:px-0 py-8">
            <h2
                className="text-3xl md:text-4xl text-black heading-title mb-6 text-center md:text-start"
                dangerouslySetInnerHTML={{
                    __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu,
                }}
            />
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Fund" : "فنڈ"}</th>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Month" : "مہینہ"}</th>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Announcement Date" : "اعلان کی تاریخ"}</th>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Cash Dividend**(Rs.)" : "کیش ڈیویڈنڈ**(روپے)"}</th>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Units Hold As On" : "یونٹس برقرار ہیں"}</th>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Ex-Bonus Price (Rs.)" : "سابق بونس کی قیمت (روپے)"}</th>
                            <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Year Ending" : "ٹرسٹی فیس"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dividend.map((div: any, index: number) => (
                            <tr key={index} className="odd:bg-white even:bg-[#EBEBEB]">
                                <td
                                    className="px-4 py-2 text-black text-center text-xs"
                                    dangerouslySetInnerHTML={{ __html: div?.product }}
                                />
                                <td className="px-4 py-2 text-black text-center text-xs">{div.month}</td>
                                <td className="px-4 py-2 text-black text-center text-xs">{div.announcementdate}</td>
                                <td className="px-4 py-2 text-black text-center text-xs">{div?.dividendcash}</td>
                                <td className="px-4 py-2 text-black text-center text-xs">{formatDateForDisplay(div?.units)}</td>
                                <td className="px-4 py-2 text-black text-center text-xs">{div?.exbonus}</td>
                                <td className="px-4 py-2 text-black text-center text-xs">{formatDateForDisplay(div?.yearedning)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
                <Link
                    href={sectionData?.button_url}
                    className="bg-awtgreen text-white px-12 py-3 text-sm uppercase hover:text-white"
                >
                    {i18n.language === 'en' ? sectionData?.button_text : sectionData?.button_text_urdu}
                </Link>
            </div>
        </div>
    );
};

export default Dividend;
