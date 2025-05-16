'use client';
import React, { useEffect, useState } from 'react'
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const searchPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/search?q=${query}`)
                .then((res) => res.json())
                .then((data) => setResults(data));
        }
    }, [query]);

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            <ul>
                {results?.blocks?.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default searchPage
