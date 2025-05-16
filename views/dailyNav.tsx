import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const DailyNav: FC = ({ sectionData, navs }: any) => {
  const { t, i18n } = useTranslation();


  return (
    <>
      <div className="container mx-auto px-4 md:px-0 py-8">
        <h2 className="text-3xl md:text-4xl text-black heading-title mb-6 text-center md:text-start"
          dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? sectionData?.title : sectionData?.title_urdu }}
        >
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{t('dailyNav.funds')}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold" style={{ width: "100px" }}>{t('dailyNav.date')}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{t('dailyNav.offer')}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{t('dailyNav.redemption')}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "EXP Ratio (%)" : "(%) اخراجات کا تناسب"}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Management Fee (%)" : "(%) مینجمنٹ فیس"}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Selling & Marketing Expenses (%)" : "(%) فروخت اور مارکیٹنگ کے اخراجات"}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Front-End Load (%)" : "(%) فرنٹ اینڈ لوڈ"}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Back-end Load (%)" : "(%) بیک اینڈ لوڈ"}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Contingent Load (%)" : "(%) کنٹیجینٹ لوڈ"}</th>
                <th className="px-4 py-2 text-center bg-primary text-white text-xs font-semibold">{i18n.language === 'en' ? "Trustee Fee (%)" : "(%) ٹرسٹی فیس"}</th>
              </tr>
            </thead>
            <tbody>
              {navs && navs?.map((nav: any, index: number) => (
                <tr key={index} className="odd:bg-white even:bg-[#EBEBEB]">
                  <td className="px-4 py-2 text-black text-center text-xs" dangerouslySetInnerHTML={{ __html: i18n.language === 'en' ? nav?.productTitle : nav?.productTitle }}></td>
                  <td className="px-4 py-2 text-black text-center text-xs" style={{ width: "200px" }} >{nav?.date }</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.offer || "-"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.redemption || "-"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.exp_ratio || "0"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.managementfee || "-"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.marketingexpenses || "-"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.frontendload || "0"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.backendload || "0"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.contingentload || "0"}</td>
                  <td className="px-4 py-2 text-black text-center text-xs">{nav?.trusteefee || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
          <Link href={sectionData?.button_url} className="bg-awtgreen text-white px-12 py-3 text-sm uppercase hover:text-white">
            {i18n.language === 'en' ? sectionData?.button_text : sectionData?.button_text_urdu}
          </Link>
        </div>
      </div>
    </>
  );
};

export default DailyNav;