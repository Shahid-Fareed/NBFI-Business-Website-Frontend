import dynamic from "next/dynamic";

const Content = dynamic(() => import("@/app/components/Content"), {
  ssr: true, 
});

export async function generateMetadata() {
  const data = await getData();
  return {
    title: data.page?.meta_title,
    description: data.page?.meta_description,
    keywords: data.page?.meta_keywords,
  };
}

const Page = async () => {
  const data = await getData();

  return (
    <>
      {data?.page?.jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON.parse(data.page.jsonld)),
          }}
        />
      )}
      <Content data={data} />
    </>
  );
};

export default Page;

async function getData() {
  try {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/frontpage/home`,
      { cache: 'no-store' }
    );

    if (!apiRes.ok) {
      throw new Error(
        `Failed to fetch data: ${apiRes.status} ${apiRes.statusText}`
      );
    }

    return await apiRes.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      page: {},
      sections: [],
      blogs: {},
      sliders: {},
      products: {},
      nav: {},
      tabs: {},
    };
  }
}
