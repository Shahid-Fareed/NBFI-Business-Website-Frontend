"use client";

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface FundData {
  fund: string;
  date: string;
  offer: number;
  redemption: number;
  expRatio: number;
}

const DailyNav: FC = () => {
  const { t } = useTranslation();

  const data: FundData[] = [
    { fund: t('dailyNav.AWT Income Fund'), date: '12-12-2024', offer: 122.8554, redemption: 121.4826, expRatio: 2.03 },
    { fund: t('dailyNav.AWT Islamic Income Fund'), date: '12-02-2024', offer: 117.2426, redemption: 114.6515, expRatio: 0.91 },
    { fund: t('dailyNav.AWT Islamic Stock Fund'), date: '11-29-2024', offer: 163.8762, redemption: 160.2545, expRatio: 4.88 },
    { fund: t('dailyNav.AWT Stock Fund'), date: '11-22-2024', offer: 220.4738, redemption: 215.6012, expRatio: 2.57 },
    { fund: t('dailyNav.AWT Money Market Fund'), date: '11-13-2024', offer: 127.8172, redemption: 127.8172, expRatio: 1.40 },
    { fund: t('dailyNav.AWT Financial Sector Income Fund'), date: '11-09-2024', offer: 108.4929, redemption: 108.4929, expRatio: 2.15 },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-0 pb-20">
        <h2 className="text-3xl md:text-4xl text-black mb-6 text-center md:text-start">
          {t('dailyNav.title')}
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm sm:text-base">{t('dailyNav.funds')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm sm:text-base">{t('dailyNav.date')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm sm:text-base">{t('dailyNav.offer')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm sm:text-base">{t('dailyNav.redemption')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm sm:text-base">{t('dailyNav.expRatio')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: FundData, index: number) => (
                <tr key={index} className="odd:bg-white even:bg-[#EBEBEB]">
                  <td className="px-4 py-2 text-black text-sm sm:text-base">{row.fund}</td>
                  <td className="px-4 py-2 text-black text-sm sm:text-base">{row.date}</td>
                  <td className="px-4 py-2 text-black text-sm sm:text-base">{row.offer}</td>
                  <td className="px-4 py-2 text-black text-sm sm:text-base">{row.redemption}</td>
                  <td className="px-4 py-2 text-black text-sm sm:text-base">{row.expRatio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
          <button className="bg-awtgreen text-white px-12 py-3 text-sm sm:text-base uppercase">
            {t('dailyNav.navHistory')}
          </button>
        </div>
      </div>
    </>
  );
};

export default DailyNav;