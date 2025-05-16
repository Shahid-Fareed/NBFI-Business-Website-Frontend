"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const ArchiveBlog = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [blogData, setBlogData] = useState([] as any);
  const [categories, setCategories] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { i18n } = useTranslation();
  const [nextIndex, setNextIndex] = useState(10);

  const loadMore = () => {
    setNextIndex((prev) => prev + 10);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontblogs`)
      .then((response) => {
        const apiData = response.data;
        const allBlogs = apiData.flatMap((item: any) => item.blogs || []);
       
        const yearsSet = new Set(allBlogs.map((blog: any) => new Date(blog.date).getFullYear()));
        const sortedYears = Array.from(yearsSet).sort((a:any, b:any) => b - a);

        const allCategories = ["All", ...apiData.map((item: any) => item.categoryName || "Uncategorized")];

        setCategories(allCategories);
        setAvailableYears(sortedYears);
        setBlogData(apiData);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const filteredBlogs = blogData
    .flatMap((item: any) => item.blogs)
    .filter((blog: any) => {
      const matchesCategory = activeTab === "All" || blog.category === activeTab;
      const matchesYear = selectedYear ? new Date(blog.date).getFullYear().toString() === selectedYear : true;
      const matchesKeyword = searchKeyword
        ? blog.title.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;

      return matchesCategory && matchesYear && matchesKeyword;
    });

  const paginatedData = filteredBlogs.slice(0, nextIndex);

  return (
    <div className="container">
      <div className="py-6">
        {/* Tabs */}
        <div className="flex border-b-4 gap-8 border-gray-200 relative">
          <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
            <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
            <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
            <span className="w-4 h-1 bg-primary text-primary"></span>
          </div>
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`bg-transparent text-xl border-0 rounded-none -mb-1 py-2 px-2 text-primary focus:outline-none font-medium ${activeTab === tab ? "border-b-4 border-primary" : ""
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Search by keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border text-base border-gray-300 rounded"
          />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border text-base border-gray-300 rounded"
          >
            <option value="">Select Year</option>
            {availableYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchKeyword("");
              setSelectedYear("");
            }}
            className="w-full md:w-1/3 px-4 py-2 text-base bg-awtgreen text-white rounded"
          >
            Clear Filters
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {paginatedData.map((blog: any, index: number) => {
            const bgColors = ["bg-awtgreen text-white", "bg-[#946B29] text-white", "bg-primary text-white"];
            const bgColor = bgColors[index % 3];

            return (
              <div
                key={blog.id}
                className="border border-gray-300 py-4 pr-4 shadow hover:shadow-lg transition"
              >
                <div className="flex gap-5 items-start">
                  <div className={`px-2 py-4 min-w-max text-sm ${bgColor}`}>
                    <p className="text-xs">
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h3 className="sm:text-3xl font-semibold">
                      {new Date(blog.date).getFullYear()}
                    </h3>
                  </div>
                  <div>
                    <h3
                      className="mt-2 text-lg sm:text-xl font-semibold"
                      dangerouslySetInnerHTML={{
                        __html:
                          i18n.language === "en"
                            ? blog?.title
                            : blog?.title_urdu,
                      }}
                    ></h3>
                    <p
                      className="mt-2 text-sm"
                      dangerouslySetInnerHTML={{
                        __html:
                          i18n.language === "en"
                            ? blog?.description
                            : blog?.description_urdu,
                      }}
                    ></p>
                    <div className="mt-4 flex gap-4 items-center">
                      <Link href={`/blog/${blog.slug}`} className="text-sm font-semibold">
                        READ MORE
                      </Link>
                      <Link href={`/blog/${blog.slug}`}>
                        <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-3xl" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {nextIndex < filteredBlogs.length && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="bg-awtgreen text-white px-6 py-2 w-1/3 rounded"
            >
              {i18n.language === "en" ? "View More" : "مزید دیکھیں"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchiveBlog;
