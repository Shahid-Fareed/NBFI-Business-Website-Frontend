import React from 'react';
import { GoArrowUpRight } from "react-icons/go";

const fundManagement = ({ fundManagementtitle, fundManagementCard }) => {
    return (
        <>
            <div className="mb-10">
                <h2 className="font-semibold text-lg md:text-xl text-center md:text-left">
                    {fundManagementtitle}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {fundManagementCard?.map((card, index) => (
                        <div
                            key={index}
                            className="border border-primary rounded-xl p-6 bg-white hover:bg-awtgreen min-h-[10rem] relative grid items-end group transition-all duration-300"
                        >
                            {/* Title (absolute, centered) */}
                            <h3 className="text-2xl font-semibold mb-2 absolute top-0 left-[50%] transform -translate-x-1/2 text-black text-opacity-25 group-hover:text-white group-hover:text-opacity-25 transition-all duration-300">
                                {card.title}
                            </h3>

                            {/* Content */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-base group-hover:text-white transition-all duration-300">
                                        {card.content1}
                                    </p>

                                    <h3 className="text-lg md:text-xl font-bold group-hover:text-white transition-all duration-300">
                                        {card.content2}
                                    </h3>
                                </div>
                                <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl group-hover:bg-white group-hover:text-primary transition-all duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default fundManagement
