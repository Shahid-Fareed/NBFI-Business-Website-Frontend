"use client";

import React, { FC, useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { ImFacebook2 } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { FaYoutubeSquare } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import axios from 'axios';
import moment from "moment";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/app/components/layout/googleMap"), { ssr: false });

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Footer: FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL: boolean = i18n.language === 'ur';

  const [footerData, setFooterData] = useState([] as any);
  const [disclaimerData, setDisclaimerData] = useState([] as any);
  const [footerMenu, setFooterMenu] = useState([] as any);
  const [marqueeReady, setMarqueeReady] = useState(false);
  useEffect(() => {
    setMarqueeReady(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [footerRes, disclaimerRes, menuRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontsettings`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontticker`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/frontfooter`)
        ]);
        setFooterData(footerRes.data[0]);
        setDisclaimerData(disclaimerRes.data);
        setFooterMenu(menuRes.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <footer className="bg-primary text-white text-xs font-medium min-h-[100%] sm:min-h-[50%] flex flex-col justify-end items-end">
        <div className="bg-secondary min-h-[75px] flex marquee-container w-full">
        {marqueeReady && (
          <Marquee
            direction={isRTL ? "right" : "left"}
            speed={50}
            gradient={false}
            loop={0} 
            play 
          >
            {disclaimerData.map((data: any, index: any) => (
              <span key={index} className="mx-4">
                {i18n.language === "en" ? data?.ticker : data?.ticker_urdu}
              </span>
            ))}
          </Marquee>
        )}
        </div>

        <div className="py-9 w-[100%]" style={{minHeight: '60vh', height: '100%'}}>
          <div className="container mx-auto md:px-0 px-4">
            <div className="md:grid md:grid-cols-4 gap-11">
              <div className='col-span-2'>
                <div className='grid grid-cols-2 gap-5 items-center'>
                  <div className="mb-4 col-span-2 overflow-hidden rounded-md">
                    <DynamicMap />
                  </div>

                </div>

                <div className='grid grod-cols-1 md:grid-cols-2 gap-8 mt-6'>
                  <div>
                    <p className="font-semibold text-base">{i18n.language === 'en' ? 'Head Office' : 'ہیڈ آفس'} </p>
                    <p className="mb-4 text-base" dangerouslySetInnerHTML={{
                      __html: i18n.language === 'en' ? footerData?.address : footerData?.address_urdu
                    }}></p>
                    <div className=''>
                      <div className='flex flex-row gap-1'>
                        <p className="mb-2 text-base font-semibold"> Phone Number: </p>
                        <p className="mb-2 text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.phonenumber : footerData?.phonenumber }}></p>
                      </div>
                      <p className="mb-4 text-base"><span className="font-semibold">{t("footer.fax")}</span> {i18n.language === 'en' ? footerData?.fax : footerData?.fax}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-base">{t("footer.lahore office")}</p>
                    <p className="mb-4 text-base" >{i18n.language === 'en' ? footerData?.lahoreoffice_address : footerData?.lahoreoffice_address_urdu}
                    </p>


                    <div className='flex flex-row gap-1'>
                      <p className="mb-2 text-base font-semibold"> Phone Number: </p>
                      <p className="mb-2 text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.lahoreoffice_phonenumber : footerData?.lahoreoffice_phonenumber }}></p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-base">{t("footer.karachi office")}</p>
                    <p className="mb-4 text-base" >{i18n.language === 'en' ? footerData?.karachioffice_address : footerData?.karachioffice_address_urdu}</p>



                    <div className='flex flex-row gap-1'>
                      <p className="mb-2 text-base font-semibold"> Phone Number: </p>
                      <p className="mb-2 text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.karachioffice_phonenumber : footerData?.karachioffice_phonenumber }}></p>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <p className="font-semibold text-base">{t("footer.multan branch")}</p>
                      <p className="mb-4 text-base" >{i18n.language === 'en' ? footerData?.multanoffice_address : footerData?.multanoffice_address_urdu}</p>

                      <div className='flex flex-row gap-1'>
                        <p className="mb-2 text-base font-semibold"> Phone Number: </p>
                        <p className="mb-2 text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.multanofice_phonenumber : footerData?.multanofice_phonenumber }}></p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-base mb-5">{t("footer.complaint & feedback")}</p>
                    <p className='text-sm leading-6'>{i18n.language === 'en' ? footerData?.complaintname : footerData?.complaintname_urdu} <br /> {i18n.language === 'en' ? footerData?.complaintnamedesignation : footerData?.complaintnamedesignation_urdu} </p>

                    <div className='flex flex-row gap-1'>
                      <p className="mb-2 text-base"> Tel Off: </p>
                      <p className="mb-2 text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.complaintphonenumber : footerData?.complaintphonenumber }}></p>
                    </div>

                    <div className='flex flex-row gap-1'>
                      <p className="mb-2 text-base"> Email: </p>
                      <p className="mb-2 text-base" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.complaintemail : footerData?.complaintemail }}></p>
                    </div>

                  </div>

                  <div>
                    <p className="font-semibold text-base">{t("footer.get social")}</p>
                    <div className="flex gap-4 mt-2">
                      <a href={footerData?.facebook} className="text-white hover:text-gray-400">
                        <ImFacebook2 className="text-4xl" />
                      </a>

                      <a href={footerData?.linkedin} className="text-white hover:text-gray-400">
                        <SiLinkedin className="text-4xl" />
                      </a>

                      <a href={footerData?.youtube} className="text-white hover:text-gray-400">
                        <FaYoutubeSquare className="text-[40px] -mt-[0.16rem]" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>

              <div className='col-span-2'>
                <div className='grid grod-cols-1 md:grid-cols-2 justify-between h-[90%]'>

                  {footerMenu?.map((menu: any, index: number) => (
                    <div
                      key={index}
                      className={`space-y-5 sm:space-y-0 mt-10 md:mt-0 ${index === footerMenu.length - 1 ? 'flex flex-col justify-between' : ''
                        }`}
                    >
                      <div>
                        <p className="font-semibold text-base mb-4">{i18n.language === 'en' ? menu?.title : menu?.title_urdu}</p>
                        <ul className="space-y-2">
                          {menu?.children?.map((link: any, linkIndex: number) => (
                            <li key={linkIndex}>

                              <Link href={link?.url} scroll={true} className="text-white text-sm font-normal hover:text-gray-400">
                                {i18n.language === 'en' ? link?.title : link?.title_urdu}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Add WhatsApp link to the last column */}
                      {index === footerMenu.length - 1 && (
                        <div className="">
                          <Link
                            href={`https://wa.me/${footerData?.whatsapp}`}
                            target="_blank"
                            className="bg-white border border-black bg-opacity-10 text-white hover:text-primary p-5 sm:p-10 rounded-md shadow hover:bg-gray-200 inline-flex items-center transition group w-full text-sm sm:text-lg font-normal"
                          >
                            <FontAwesomeIcon
                              icon={faWhatsapp}
                              size="2x"
                              className={`fab fa-whatsapp text-2xl sm:text-3xl text-primary bg-white px-[7px] py-[5px] rounded-md group-hover:bg-primary group-hover:text-white ${isRTL ? 'ml-3' : 'mr-3'
                                }`}
                            />{' '}
                            {t("footer.chat on wahtsapp")}
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}

                </div>


              </div>

            </div>
          </div>
        </div>

        <div className="bg-primary py-4 px-4 border-t border-white border-opacity-10 w-full">
          <div className="mx-auto container sm:flex flex-wrap justify-between items-center space-y-4 sm:space-y-0 sm:flex-nowrap">
            <p className='text-base font-normal ' dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? footerData?.copyright : footerData?.copyright_urdu }}></p>
            <p className='text-base font-normal'>
              {t("footer.Powered by")}{" "}
              <Link href="https://websouls.com/" className="text-white hover:text-white font-semibold">
                Websouls
              </Link>
            </p>
            <p className='text-base font-normal'>{t("footer.Last Updated")} {moment().format(" Do MMM YYYY")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;