import React from "react";
import InnerBanner from "@/app/components/products/innerBanner";
import FundFacts from "@/app/components/products/subfundFacts";
// import Disclaimer from "@/app/components/products/disclimer";
import ProductBenefit from "@/app/components/products/productBenefit";
import { notFound } from "next/navigation";
import ProductObjective from "@/app/components/products/subproductObjective";
import DailyNav from "@/app/components/products/dailyNav";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await params;  // Ensure to await params if they are passed async
    const data = await getMutualFund(slug);
    return {
        title: data?.product?.meta_title,
        description: data?.product?.meta_description,
    };
}

async function getMutualFund(slug: string) {
    const productSlug = slug.split("/").pop();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontproduct/${productSlug}`, {
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

export default async function MutualFundsProducts({ params }: { params: { slug: string } }) {
    const data = await getMutualFund(params.slug);

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
                        title={data.product.title || ""}
                        titleUrdu={data.product.title_urdu || ""}
                        subtitle={data.product.subtitle || ""}
                        subtitleUrdu={data.product.subtitle_urdu || ""}
                        imageUrl={data.product.featuredimage || ""}
                    />

                    <ProductObjective objective={data.product.objective || []} Slug={data.product.slug || ""}  />

                    <FundFacts Slug={data.product.slug || ""} Factscard={data.product.fundfact || []} DownloadCategory={data.downloadCategories || []} FileCategory={data.product.downloadcategory || [] } />

                    <DailyNav />

                    <ProductBenefit benefits={data.product.benefits[0] || []} />

                    {/* <Disclaimer /> */}
                </div>
            </div>
        </div>
    );
}
