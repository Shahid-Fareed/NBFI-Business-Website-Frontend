import React from "react";
import InnerBanner from "@/app/components/downloads/innerBanner";
import ReportFiles from "@/app/components/downloads/reportFiles";
import { notFound } from "next/navigation";

async function getDownloads(slug: string, productSlug?: string) {
    const downloadSlug = slug.split("/").pop();
    const queryParam = productSlug ? `?productSlug=${productSlug}` : "";

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontdownload/${downloadSlug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default async function DownloadFiles({ params, searchParams }: { 
    params: { slug: string }, 
    searchParams?: { productSlug?: string } 
}) {
    const productSlug = searchParams?.productSlug || "";
    const data = await getDownloads(params.slug, productSlug);

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
                <div className="container pb-8">
                    <InnerBanner
                        title={data.category.title || ""}
                        titleUrdu={data.category.title_urdu || ""}
                        subtitle={data.category.subtitle || ""}
                        subtitleUrdu={data.category.subtitle_urdu || ""}
                        imageUrl={data.category.featuredimage || ""}
                    />

                    <div className="pt-8 pb-8">
                        <ReportFiles Slug={params.slug} ProductSlug= {productSlug} ID={data.category.id}  />
                    </div>
                </div>
            </div>
        </div>
    );
}
