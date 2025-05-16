import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const Content = dynamic(() => import("@/app/components/Content"), {
  ssr: true, 
});

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;  
  const data = await getData(slug);
  return {
    title: data.page?.meta_title,
    description: data.page?.meta_description,
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params; // Log the slug value to see if it's correct
  const data = await getData(slug);

  if (!data?.page) {
    notFound();
  }

  return <Content data={data} />;
};

export default Page;

async function getData(slug: string) {
 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontpage/${slug}`,
    { cache: 'no-store' }
    );
    // if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
   

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    notFound();
  }
}

