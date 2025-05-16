"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Get query param from URL
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error("Error fetching search results:", err));
    }
  }, [query]);

  const { i18n } = useTranslation();

  return (
    <div style={{ backgroundImage: "url('/assets/background-repeat1.png')" }}>
      <div
        style={{
          background:
            "linear-gradient(to right, rgb(245 247 255 / 92%), rgb(251 255 248 / 92%), rgb(255 252 246 / 92%))",
          zIndex: -1,
        }}
      >
        <div className="container px-4 sm:px-0 py-16">
          <h1>Search Results for "{query}"</h1>
          <div>
            {results?.blocks?.map((item: any) =>
              item.relatedPages.map((page: any) => (
                <div key={item.id} className="border border-primary p-4 my-6 bg-white bg-opacity-50">
                  <Link href={`/${page.slug}`}>
                    <h2
                      className="text-xl font-semibold hover:text-awtgreen"
                      dangerouslySetInnerHTML={{
                        __html: i18n.language === "en" ? item?.title : item?.title_urdu,
                      }}
                    ></h2>
                  </Link>
                  <p
                    className="line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: i18n.language === "en" ? item?.description : item?.description_urdu,
                    }}
                  ></p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component in Suspense
const SearchPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchResults />
  </Suspense>
);

export default SearchPage;
