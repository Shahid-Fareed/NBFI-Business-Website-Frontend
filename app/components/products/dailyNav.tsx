"use client";

import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface FundData {
  allocationScheme: string;
  suitability: string;
  equitySubFund: string;
  debtSubFund: string;
  moneyMarketSubFund: string;
}

const DailyNav: FC = () => {
  const { t } = useTranslation();

  const data: FundData[] = [
    { fund: t('subfunds.Allocation Scheme'), allocationScheme: 'High Volatility', suitability: "Long term horizon and high-risk ability/return objective", equitySubFund: "Min 65%", debtSubFund: "Min 20%", moneyMarketSubFund: "Nil"  },
    { fund: t('subfunds.Suitability'), allocationScheme: 'Medium Volatility', suitability: "Medium term horizon and moderate risk ability / return objective", equitySubFund: "Min 35%", debtSubFund: "Min 40%", moneyMarketSubFund: "Min 10%" },
    { fund: t('subfunds.Equity Sub Fund'), allocationScheme: 'Low Volatility', suitability: "Short to medium term horizon and low-risk ability/return objective", equitySubFund: "Min 10%", debtSubFund: "Min 60%", moneyMarketSubFund: "Min 15%" },
    { fund: t('subfunds.Debt Sub Fund'), allocationScheme: 'Lower Volatility', suitability: "Investors nearing retirement age and very low-risk ability/return objective", equitySubFund: "Nil", debtSubFund: "Min 40%", moneyMarketSubFund: "Min 40%" },
    { fund: t('subfunds.Money Market Sub Fund'), allocationScheme: 'Customized Allocation Scheme', suitability: "Depending on risk preference / return objective and time to retirement", equitySubFund: "0%-100%", debtSubFund: "1.40", moneyMarketSubFund: "0%-100%" },
  ];

  return (
    <>
      <div className="container mx-auto px-4 md:px-0 pb-8">
        <h2 className="text-3xl md:text-4xl text-black mb-6 text-center md:text-start">
          {t('subfunds.title')}
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm">{t('subfunds.Allocation Scheme')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm">{t('subfunds.Suitability')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm">{t('subfunds.Equity Sub Fund')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm">{t('subfunds.Debt Sub Fund')}</th>
                <th className="px-4 py-2 text-start bg-primary text-white text-sm">{t('subfunds.Money Market Sub Fund')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: FundData, index: number) => (
                <tr key={index} className="odd:bg-white even:bg-[#EBEBEB]">
                  <td className="px-4 py-2 text-black text-sm">{row.allocationScheme}</td>
                  <td className="px-4 py-2 text-black text-sm">{row.suitability}</td>
                  <td className="px-4 py-2 text-black text-sm">{row.equitySubFund}</td>
                  <td className="px-4 py-2 text-black text-sm">{row.debtSubFund}</td>
                  <td className="px-4 py-2 text-black text-sm">{row.moneyMarketSubFund}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  );
};

export default DailyNav;