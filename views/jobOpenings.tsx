"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const JobOpenings = ({ sectionData }: any) => {
    const [jobs, setJobs] = useState([] as any); // Stores job data
    const [filterData, setFilterData] = useState({ departments: [], locations: [] }); // Stores dropdown data
    const [filters, setFilters] = useState({ department: "", location: "" }); // Stores filter selections
    const [error, setError] = useState("");
    const [nextIndex, setNextIndex] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
    type Job = typeof jobs[number];
    const [selectedJob, setSelectedJob] = useState<Job | null>(null); // Stores selected job details
    const { i18n } = useTranslation();

    // Fetch departments, locations, and all jobs initially
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [filterResponse, jobsResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontjob/filters`),
                    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontjob`),
                ]);

                setFilterData(filterResponse.data); // Populate dropdown options
                setJobs(jobsResponse.data); // Populate jobs
            } catch (err: any) {
                setError("Failed to fetch job data or filters. Please try again.");
            }
        };

        fetchInitialData();
    }, []);

    // Fetch filtered jobs when filters are applied or cleared
    useEffect(() => {
        const fetchFilteredJobs = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontjob`, {
                    params: filters, // Pass filters as query parameters
                });
                setJobs(response.data); // Update jobs with filtered results
            } catch (err: any) {
                setError("Failed to fetch filtered jobs. Please try again.");
            }
        };

        fetchFilteredJobs();
    }, [filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    // Load more data dynamically
    const loadMore = () => {
        setNextIndex((prev) => prev + 10);
    };

    const paginatedData = jobs.slice(0, nextIndex);

    const clearFilters = () => {
        // Reset filters to empty and fetch all jobs
        setFilters({ department: "", location: "" });
    };

    const openModal = (job: any) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedJob(null);
        setIsModalOpen(false);
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container max-auto md:px-0 px-4">
            <h1
                className="text-3xl sm:text-4xl mb-4 heading-title"
                dangerouslySetInnerHTML={{
                    __html: i18n.language === "en" ? sectionData?.title : sectionData?.title_urdu,
                }}
            ></h1>
            <div className="flex items-center gap-4 mb-6">
                <select
                    className="p-2 border border-gray-300 rounded w-1/3"
                    value={filters.department}
                    onChange={(e) => handleFilterChange("department", e.target.value)}
                >
                    <option value="">All Departments</option>
                    {filterData.departments?.map((department: string, index: number) => (
                        <option key={index} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
                <select
                    className="p-2 border border-gray-300 rounded w-1/3"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                >
                    <option value="">All Locations</option>
                    {filterData.locations?.map((location: string, index: number) => (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-awtgreen w-1/3 text-white px-4 py-2 rounded"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>
            <div>
                {paginatedData.length > 0 ? (
                    paginatedData.map((job: any) => (
                        <div
                            key={job.id}
                            // onClick={() => openModal(job)} // Open modal on click
                            className="flex items-center justify-between border border-[#D9D9D9] p-4 group bg-white mb-2"
                        >
                            <div>
                                <h2 className="text-lg sm:text-2xl font-normal">{i18n.language === "en" ? job?.job : job?.job_urdu}</h2>
                                <p className="text-base">{i18n.language === "en" ? job?.department : job?.department_urdu}</p>
                            </div>
                            <div className="flex items-center gap-2 transition-all duration-200">
                                <span className="text-lg sm:text-xl text-awtgreen bg-awtgreen p-7 -my-4 -mr-9 bg-opacity-5 flex gap-3 items-center transform group-hover:-translate-x-12 transition-transform duration-200">
                                    <img src="/assets/location-icon.png" alt="" />
                                    {i18n.language === "en" ? job?.location : job?.location_urdu}
                                </span>
                                <Link href={job?.url}>
                                <img
                                    src="/assets/Vector.png"
                                    alt=""
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 rotate-45"
                                />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-gray-500">No jobs found.</p>
                )}
            </div>
            <div className="text-center mt-4">
                {/* Load More Button */}
                {nextIndex < jobs.length && (
                    <button
                        onClick={loadMore}
                        className="bg-awtgreen text-base text-white px-6 py-2 w-1/3 rounded"
                    >
                        {i18n.language === 'en' ? "View More" : "مزید دیکھیں"}
                    </button>
                )}
            </div>

            {/* Modal Component */}
            {isModalOpen && selectedJob && (
                <div className="fixed inset-0 flex justify-center items-center z-50" style={{background: '#00000070'}}>
                    <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 relative" style={{ padding: '40px' }}>
                        <a
                            className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                            onClick={closeModal}
                        >
                            x
                        </a>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold mb-4">{i18n.language === "en" ? selectedJob?.job : selectedJob?.job_urdu}</h2>
                            <button className="bg-awtgreen text-white w-full sm:w-auto"> Apply Now </button>
                        </div>

                        {/* <p className="mb-2">{i18n.language === "en" ? selectedJob?.department : selectedJob?.department_urdu}</p>
                        <p className="mb-4 text-sm text-gray-500">{i18n.language === "en" ? selectedJob?.location : selectedJob?.location_urdu}</p> */}
                        <p dangerouslySetInnerHTML={{
                            __html: i18n.language === "en" ? selectedJob?.description : selectedJob?.description_urdu,
                        }}></p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default JobOpenings;
