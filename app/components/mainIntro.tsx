"use client";
import React from 'react';

const mainIntro = ({ sections, mainIntro, mainTitle }) => {
    return (
        <>
            <div className="my-16 px-4 md:px-0">
                <h2 className="text-2xl md:text-3xl font-bold text-awtgreen mb-6 ">
                    {mainTitle}
                </h2>
                <p className="text-base">
                    {mainIntro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {sections.map((section, index) => (
                        <div key={index} className="">
                            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                                {section.title}
                            </h3>
                            <p className="text-base text-gray-800 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default mainIntro
