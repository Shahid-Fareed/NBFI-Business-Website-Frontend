'use client';
import React, { useState } from 'react'

const documentRequired = ({ faqs }) => {

    const [openIndex, setOpenIndex] = useState(null); // To track which FAQ is open

    const handleToggle = (index) => {
        setOpenIndex(index === openIndex ? null : index); // Close if the same index is clicked
    };

    return (
        <>
            <div className='container bg-[#DCE3F2] p-10'>
                <h2 className='font-semibold text-2xl mb-5'>Documents Required</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className=''>
                        <h3 className='font-medium'>For Individual Investors :</h3>
                        <ul>
                            <li>Copy of valid CNIC/NICOP/Passport</li>
                            <li>Copy of Nominee (s) valid CNIC/NICOP Passport</li>
                            <li>Zakat Affidavit (CZ-50) in case of Zakat Exemption</li>
                            <li>Employment Proof (Employer Certificate/ Employment Card Copy/Salary Slip Copy)</li>
                            <li>Business proof (Business Card)</li>
                            <li>W-9 Form (If U.S Citizen)</li>
                            <li>W-8 BEN Form (If non U.S. Citizen)</li>
                        </ul>
                </div>
                <div>
                    <div className="space-y-2 divide-y-2">
                    <h3 className='font-medium'>For Corporate Clients :      </h3>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className=" py-4"
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => handleToggle(index)}
                                >
                                    <span className=" font-medium text-black">
                                        {faq.blockTitle}
                                    </span>
                                    <span>
                                        {openIndex === index ? (
                                            <img
                                                src="/assets/faqarrowup.png" // Replace with your "arrow up" icon path
                                                alt="Arrow Up"
                                                className=""
                                            />
                                        ) : (
                                            <img
                                                src="/assets/faqarrowdown.png" // Replace with your "arrow down" icon path
                                                alt="Arrow Down"
                                                className=""
                                            />
                                        )}
                                    </span>
                                </div>
                                {openIndex === index && (
                                    <p className="mt-2 text-black transition-all">{faq.blockContent}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default documentRequired
