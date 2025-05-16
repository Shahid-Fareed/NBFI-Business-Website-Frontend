"use client";
import React, { useState } from 'react'

const faq = ({faqs}) => {

    const [openIndex, setOpenIndex] = useState(null); // To track which FAQ is open

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index); // Close if the same index is clicked
  };

    return (
        <>
            <div className='container'>
                <p>
                    A mutual fund is an investment vehicle made up of a pool of money collected from money investors. The professional manager for the fund invest the money in dierent type of assets,including stocks, bonds, commodities and even real estate, to produce capital gains and/or income for the funds investors.
                </p>
            </div>
            <div>
                <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-2 divide-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=" py-4"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <span className="text-lg font-medium text-black">
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
        </>
    )
}

export default faq
