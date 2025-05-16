import React from 'react'

import SinglePost from '@/app/components/blog/singlePost'

import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params; 
  const data = await getBlog(slug);
  return {
    title: data?.meta_title,
    description: data?.meta_description,
  };
}

async function getBlog(slug: string) {
    const Blogslug = slug.split("/").pop(); 
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontblogs/${Blogslug}`, {
            cache: "no-store", 
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        
        return data;
        
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}
export default async function page({ params }: { params: { slug: string } }) {

    const data = await getBlog(params.slug);
    
    
        if (!data) {
            notFound();    
        }

    return (
        <div style={{ backgroundImage: "url('/assets/background-repeat1.png')" }}>
            <div
                style={{
                    background: "linear-gradient(to right, rgb(245 247 255 / 92%), rgb(251 255 248 / 92%), rgb(255 252 246 / 92%))",
                    zIndex: -1,
                }}
            >

                <SinglePost data={data}/>
            </div>
        </div>
    )
}

