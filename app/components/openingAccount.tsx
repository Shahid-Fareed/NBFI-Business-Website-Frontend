"use client";
import React from 'react'

const openingAccount = ({ imgURL, title, content }) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center my-12 ">
                {/* Text Content */}
                <div className="md:col-span-2 flex flex-col justify-center text-center md:text-left px-4 md:px-0">
                    <p className="text-sm md:text-base text-gray-500 font-medium mb-2">Step 1</p>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3">{title}</h2>
                    <p className="text-sm md:text-base text-gray-700">{content}</p>
                </div>

                {/* Image */}
                <div className="md:col-span-1">
                    <img
                        className="w-full max-w-xs md:max-w-full rounded-2xl mx-auto md:mx-0"
                        src={imgURL}
                        alt="Opening Account"
                    />
                </div>
            </div>

        </>
    )
}

export default openingAccount
