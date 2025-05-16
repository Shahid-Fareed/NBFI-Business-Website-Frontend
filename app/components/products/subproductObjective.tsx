"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';


const productObjective = ({ objective, Slug, Equity, fixedIncome }: any) => {
    const { i18n } = useTranslation();
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

        </div>
    )
}

export default productObjective
