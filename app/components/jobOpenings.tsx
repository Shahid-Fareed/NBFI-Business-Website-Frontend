"use client";
import React, { useState } from 'react'

const jobOpenings = () => {
    const [jobs] = useState([
        { id: 1, title: "Senior Manager Internal Audit", department: "Internal Audit", location: "Lahore" },
        { id: 2, title: "Senior Manager Internal Audit", department: "Internal Audit", location: "Lahore" },
        { id: 3, title: "Senior Manager External Audit", department: "External Audit", location: "Karachi" },
        { id: 4, title: "Senior Manager Internal Audit", department: "Internal Audit", location: "Lahore" },
    ]);
    const [filters, setFilters] = useState({ department: "", location: "" });

    const filteredJobs = jobs.filter((job) => {
        return (
            (filters.department === "" || job.department === filters.department) &&
            (filters.location === "" || job.location === filters.location)
        );
    });

    const handleFilterChange = (key:any, value:any) => {
        setFilters({ ...filters, [key]: value });
    };

    const clearFilters = () => setFilters({ department: "", location: "" });
    return (
        <>
            <div className="">
                <h1 className="text-4xl font-bold mb-4">Job <span className='font-normal'>Openings</span> </h1>
                <div className="flex items-center gap-4 mb-6">
                    <select
                        className="p-2 border border-gray-300 rounded w-1/3"
                        onChange={(e) => handleFilterChange("department", e.target.value)}
                    >
                        <option value="">All Departments</option>
                        <option value="Internal Audit">Internal Audit</option>
                        <option value="External Audit">External Audit</option>
                    </select>
                    <select
                        className="p-2 border border-gray-300 rounded w-1/3"
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                    >
                        <option value="">All Locations</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                    </select>
                    <button
                        className="bg-awtgreen w-1/3 text-white px-4 py-2 rounded"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
                <div className="">
                    {filteredJobs.map((job) => (
                        <div
                            key={job.id}
                            className="flex items-center justify-between border border-[#D9D9D9] p-4 group bg-white mb-2"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{job.title}</h2>
                                <p className="text-sm text-gray-500">{job.department}</p>
                            </div>
                            <div className="flex items-center gap-2 transition-all duration-200">
                                <span
                                    className="text-awtgreen bg-awtgreen p-7 -my-4 -mr-9 bg-opacity-5 flex items-center transform group-hover:-translate-x-12 transition-transform duration-200"
                                >
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 10.5l4.5 4.5m0 0l-4.5 4.5m4.5-4.5H3"
                                        />
                                    </svg> */}
                                    <img src="/assets/location-icon.png" alt="" />
                                    {job.location}
                                </span>
                                <img src="/assets/Vector.png" alt="" className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 rotate-45' />
                                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 6.75L9.75 12l7.5 5.25"
                                    />
                                </svg> */}
                            </div>
                        </div>
                    ))}
                    {filteredJobs.length === 0 && (
                        <p className="p-4 text-gray-500">No jobs found.</p>
                    )}
                </div>
                <div className='text-center'>
                    <a href='#' className="inline-block mt-4 w-2/5 text-center bg-awtgreen text-white px-6 py-4 rounded">
                        View More
                    </a>
                </div>
            </div>

        </>
    )
}

export default jobOpenings
