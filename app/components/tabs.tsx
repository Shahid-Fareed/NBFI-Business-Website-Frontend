"use client";
import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

const tabs = ({ profiles }) => {

  const [activeTab, setActiveTab] = useState("Directors");


  // Filter profiles based on the active tab
  const filteredProfiles = profiles.filter(
    (profile) => profile.category === activeTab
  );



  return (
    <>
      <div className="mx-4 lg:mx-0">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 border-b-4 border-gray-200 mb-4 relative">
          <div className="grid grid-cols-3 gap-1 absolute right-0 -bottom-1">
            <span className="w-4 h-1 bg-primary text-primary"></span>
            <span className="w-4 h-1 bg-[#946B29] text-[#946B29]"></span>
            <span className="w-4 h-1 bg-awtgreen text-awtgreen"></span>
          </div>
          {["Directors", "Management", "Sponsors"].map((tab) => (
            <button
              key={tab}
              className={`px-4 md:px-6 py-2 -mb-[2px] text-sm md:text-lg transition-colors duration-300 bg-transparent border-0 hover:border-b-2 hover:border-b-primary rounded-none text-primary focus:outline-none ${activeTab === tab
                ? "font-bold border-b-4 border-b-primary"
                : "hover:border-b-primary"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#0f1b3f6e] to-transparent hover:from-primary hover:via-white hover:via-90% hover:to-primary hover:to-100% transition-all relative group shadow-lg"
              >
                <img
                  src={profile.profileImg}
                  alt={profile.profileDesignation}
                  className="w-full object-cover"
                />
                <div className="bg-white bg-opacity-75 group-hover:bg-primary p-4 rounded-md absolute bottom-5 flex flex-col sm:flex-row gap-3 sm:gap-5 items-center mx-4 sm:mx-6 transition-all duration-300">
                  <div>
                    <h3 className="text-lg sm:text-2xl text-primary group-hover:text-white font-semibold sm:text-left text-center">
                      {profile.profileDesignation}
                    </h3>
                    <p className="text-sm sm:text-base text-primary group-hover:text-white sm:text-left text-center">
                      {profile.profileDetail}
                    </p>
                  </div>
                  <GoArrowUpRight className="bg-[#BFBFBF] bg-opacity-50 rounded-full p-2 text-3xl md:text-4xl group-hover:bg-white group-hover:text-primary transition-all duration-300" />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">
              No profiles found for {activeTab}
            </p>
          )}
        </div>
      </div>

    </>
  )
}

export default tabs;
