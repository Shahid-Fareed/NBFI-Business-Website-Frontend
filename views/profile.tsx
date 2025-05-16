import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Profile = ({ sectionData }: any) => {
    const { i18n } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    type Data = typeof sectionData[number];
    const [selectedProfile, setSelectedProfile] = useState<Data | null>(null);


    const openModal = (block: any) => {
        setSelectedProfile(block);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProfile(null);
        setIsModalOpen(false);
    };



    return (
      
        <div className="container py-8">
            <div className="mx-4 lg:mx-0  ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {sectionData?.blocks?.length > 0 ? (
                        sectionData?.blocks?.map((block: any, index: any) => (
                            <div
                                key={block?.id || index}
                                onClick={() => openModal(block)}
                                className="bg-gradient-to-b from-[#0f1b3f6e] to-transparent hover:from-primary hover:via-white hover:via-90% hover:to-primary hover:to-100% transition-all relative group shadow-lg cursor-pointer"
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_Image_Path}/blocks_image/${block?.featuredimage}`}
                                    alt={block?.alt || "Image"}
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-full"
                                    loading="lazy"
                                />

                                <div className="bg-white bg-opacity-75 group-hover:bg-primary p-4 rounded-md absolute bottom-5 right-0 flex flex-col sm:flex-row gap-3 sm:gap-5 items-center mx-4 sm:mx-6 transition-all duration-300" style={{ maxWidth: '90%', width: '100%' }}>
                                    <div className="w-4/5">
                                    <p
                                            className="text-lg sm:text-2xl text-primary group-hover:text-white font-semibold sm:text-left text-center"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    i18n.language === "en"
                                                        ? block?.subtitle
                                                        : block?.subtitle_urdu,
                                            }}
                                        />
                                        <h3 className="text-sm sm:text-base font-normal text-primary group-hover:text-white sm:text-left text-center">
                                            {i18n.language === "en" ? block?.title : block?.title_urdu}
                                        </h3>
                                        
                                    </div>
                                    <div className="w-1/5 sm:ml-auto">
                                        <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl group-hover:bg-white group-hover:text-primary transition-all duration-300" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        null
                    )}
                </div>

                {/* Modal Component */}
                {isModalOpen && selectedProfile && (
                    <div className="fixed inset-0 flex justify-center items-center z-50" style={{ background: '#00000070' }}>
                        <div className="bg-white  p-8 rounded-lg w-11/12 md:w-1/2 relative" style={{ padding: '40px' }}>
                            <a
                                className="absolute top-0 right-0 p-4 cursor-pointer text-xl"
                                onClick={closeModal}
                            >
                                x
                            </a>
                            <div className="">
                                <h2 className="text-2xl font-bold mb-4">{i18n.language === "en" ? selectedProfile?.title : selectedProfile?.title_urdu}</h2>
                                <h5 className="text-lg mb-4">{i18n.language === "en" ? selectedProfile?.subtitle : selectedProfile?.subtitle_urdu}</h5>
                            </div>
                            <p dangerouslySetInnerHTML={{
                                __html: i18n.language === "en" ? selectedProfile?.description : selectedProfile?.description_urdu,
                            }}></p>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;
