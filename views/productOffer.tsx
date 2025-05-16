"use client"
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import React, { FC, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ProductOffer: FC = ({ sectionData }: any) => {
    const { t }: { t: (key: string) => string } = useTranslation();
    const { i18n } = useTranslation();
    const [topMargin, setTopMargin] = useState('-90px');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setTopMargin(window.innerWidth >= 786 ? '-100px' : '-90px');
        }
    }, []);


    const YouTubeEmbed = dynamic(() => import('@/views/youtubeLink'), {
        ssr: false,
        loading: () => <div className="h-[400px] bg-gray-200 animate-pulse rounded-lg mx-auto w-full md:w-2/3 px-4" style={{ marginTop: topMargin }} />,
    });

    const convertToEmbedLink = (url: string): string => {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtube.com')) {
                const videoId = urlObj.searchParams.get('v');
                return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
            } else if (urlObj.hostname.includes('youtu.be')) {
                const videoId = urlObj.pathname.substring(1);
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch (err) {
            console.warn('Invalid YouTube URL:', url);
        }
        return '';
    };

    const embedLink = useMemo(() => convertToEmbedLink(sectionData?.video), [sectionData?.video]);

    return (
        <>

            <div className="bg-primary text-white pt-16 md:pb-48 pb-36">
                <div className="container mx-auto px-4 md:px-0">
                    <h2 className="text-base text-[#F0AF45] white heading-title mb-4 " dangerouslySetInnerHTML={{
                        __html: i18n.language === 'en' ? sectionData?.subtitle : sectionData?.subtitle_urdu,
                    }}>

                    </h2>
                    <h1 className="text-3xl md:text-[28px] font-bold mb-12">
                        {i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu}
                    </h1>

                    <div className="flex space-y-4 sm:space-y-0 flex-col md:flex-row gap-5">
                        {sectionData?.blocks?.map((block: any, index: any) => (
                            <div key={index} className="md:w-1/3 w-full">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.featuredimage}`}
                                    className="mb-5"
                                    alt={block?.alt}
                                    width='71'
                                    height='71'
                                    priority
                                />

                                <h3 className="text-xl font-semibold mb-2">{i18n.language === 'en' ? block?.title : block?.title_urdu}</h3>
                                <p className="text-base mb-4"
                                    dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? block?.description : block?.description_urdu }}>
                                </p>
                                <a href={block?.button_url} className="rounded border border-white text-white p-6 sm:p-4 flex justify-between items-center w-full md:w-1/2">

                                    <span className="mr-3 text-sm">{i18n.language === 'en' ? block?.button_text : block?.button_text_urdu}</span>
                                    <img src="/assets/whiteVector.png" className="w-4 h-4" alt={t('productOffer.investorIconAlt')} />
                                </a>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            {embedLink && <YouTubeEmbed embedLink={embedLink} thumbnailUrl = {sectionData.featuredimage} topMargin={topMargin} />}

        </>
    );
};

export default ProductOffer;