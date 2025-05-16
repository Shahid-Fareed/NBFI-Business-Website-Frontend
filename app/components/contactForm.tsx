"use client";
import React, { useState } from 'react';

const contactForm = () => {
    const [activeTab, setActiveTab] = useState("contact");
    return (
        <>
            <div className="">
                {/* Tabs */}
                <div className="flex border-b-4 gap-3 mb-6 relative">
                    <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
                        <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
                        <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
                        <span className="w-4 h-1 bg-primary text-primary"></span>
                    </div>
                    <button
                        className={`bg-transparent border-0 rounded-none -mb-1 py-2 text-primary focus:outline-none font-medium ${activeTab === "contact"
                            ? "border-b-4 border-primary "
                            : ""
                            }`}
                        onClick={() => setActiveTab("contact")}
                    >
                        Contact Form
                    </button>
                    <button
                        className={`bg-transparent border-0 rounded-none -mb-1 py-2 text-primary focus:outline-none font-medium ${activeTab === "complaint"
                            ? "border-b-4 border-primary"
                            : ""
                            }`}
                        onClick={() => setActiveTab("complaint")}
                    >
                        Complaint & Inquiry Form
                    </button>
                </div>

                {/* Form */}
                <div>
                    {activeTab === "contact" && (
                        <form className="grid md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="col-span-1 p-2 border rounded  focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="col-span-1 p-2 border rounded focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="col-span-1 p-2 border rounded focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="col-span-1 p-2 border rounded focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                className="col-span-1 p-2 border rounded focus:outline-none"
                            />
                            <input
                                type="Select"
                                placeholder="Query"
                                className="col-span-1 p-2 border rounded focus:outline-none"
                            />
                            <textarea
                                placeholder="Message"
                                className="col-span-3 p-2 border rounded focus:outline-none"
                                rows="4"
                            />
                            <button
                                type="submit"
                                className="col-span-1 col-start-3 py-2 bg-awtgreen text-white rounded"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                    {activeTab === "complaint" && (
                        <form className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="col-span-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="col-span-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="col-span-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <textarea
                                placeholder="Your Complaint or Inquiry"
                                className="col-span-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                                rows="4"
                            />
                            <button
                                type="submit"
                                className="col-span-2 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>

        </>
    )
}

export default contactForm
