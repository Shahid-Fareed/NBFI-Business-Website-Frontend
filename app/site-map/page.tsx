import React from 'react'

const sitemapData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "About Us",
        subpages: [
            { name: "Company Profile", url: "/company-profile" },
            { name: "Director's Profile", url: "/directors-profile" },
            { name: "Management Profile", url: "/sponsors-profile" },
            { name: "Sponsor's Profile", url: "/management-profile" },
        ]
    },
    {
        name: "Our Products",
        subpages: [
            {
                name: "Mutual Funds",
                grandsubpages: [
                    { name: "AWT Islamic Income Fund", url: "/mutual-funds/awt-islamic-income-fund" },
                    { name: "AWT Islamic Stock Fund", url: "/mutual-funds/awt-islamic-stock-fund" },
                    { name: "AWT Income Fund", url: "/mutual-funds/awt-income-fund" },
                    { name: "AWT Financial Sector Income Fund", url: "/mutual-funds/awt-financial-sector-income-fund" },
                    { name: "AWT Money Market Fund", url: "/mutual-funds/awt-money-market-fund" },
                    { name: "AWT Stock Fund", url: "/mutual-funds/awt-stock-fund" },
                ]
            },
            {
                name: "Pension Funds",
                grandsubpages: [
                    { name: "AWT Islamic Pension Fund", url: "/pension-funds/awt-islamic-pension-fund" },
                ]
            },
            { name: "Investment dvisory", url: "/investment-advisory" },
        ]
    },
    {
        name: "investor Education",
        subpages: [
            { name: "Mutual Fund Basics", url: "/mutual-fund-basics" },
            { name: "FAQs", url: "/faqs" },
            { name: "Daily NAV and Expense Ratio", url: "/daily-nav" },
            { name: "How to Invest", url: "/how-to-invest" },
            { name: "Calculators", url: "#" },
            { name: "AWT Mobile App", url: "/awt-mobile-app" },
        ]
    },
    {
        name: "Downloads",
        subpages: [
            { name: "Fund Manager Report", url: "/fund-managers-report" },
            { name: "Trust Deed", url: "/downloads/trust-deed" },
            { name: "Financial Statements", url: "/downloads/financial-statements" },
            { name: "Key Policies", url: "/downloads/key-policies" },
            { name: "Application Forms", url: "/downloads/application-forms" },
            { name: "Careers", url: "/career" },
            { name: "Constitutional Documents", url: "/downloads/constitutional-documents" },
            { name: "Product Brochures", url: "/downloads/product-brouchers" },
            { name: "Shariah Documents", url: "/downloads/shariah-documents" },
            { name: "News & Announcements", url: "/news-and-announcements" },
            { name: "Contact Us", url: "/contact" },
        ]
    },
    {
        name: "Regulators",
        subpages: [
            { name: "MUFAP", url: "https://www.mufap.com.pk/" },
            { name: "PSX", url: "https://www.psx.com.pk/" },
            { name: "FBR", url: "https://www.fbr.gov.pk/" },
            { name: "CDC", url: "https://www.cdcpakistan.com/" },
            { name: "NCCPL", url: "https://www.nccpl.com.pk/" },
            { name: "SECP", url: "https://www.secp.gov.pk/" },
            { name: "SBP", url: "https://www.sbp.org.pk/index.html" },
        ]
    },
    {
        name: "Quick Links",
        subpages: [
            { name: "Complaint", url: "/contact#complaint" },
            { name: "SECP Complaint", url: "https://sdms.secp.gov.pk/?q=/complaintform1.asp" },
            { name: "Privacy Policy", url: "/privacy-policy" },
        ]
    },
];

const Sitemap = () => {
    return (
        <div style={{ backgroundImage: "url('/assets/background-repeat1.png')" }}>
            <div
                style={{
                    background:
                        "linear-gradient(to right, rgb(245 247 255 / 92%), rgb(251 255 248 / 92%), rgb(255 252 246 / 92%))",
                    zIndex: -1,
                }}
            >
                <div className="container px-4 sm:px-0 py-16">


                    <h1 className="text-3xl sm:text-4xl sm:text-left text-center font-semibold text-primary mb-6">
                        Sitemap
                    </h1>

                    <div className="sm:flex sm:flex-wrap justify-between gap-4 sm:space-y-0 space-y-2">
                        {sitemapData.map((page, index) => (
                            <div key={index} className="text-center">
                                <a href={page.url} className="text-base font-semibold bg-primary p-2 rounded-md text-white block">
                                    {page.name}
                                </a>
                                {page.subpages && (
                                    <div className="mt-2 space-y-2">
                                        {page.subpages.map((subpage, subIndex) => (
                                            <div key={subIndex} className="">
                                                <a href={subpage.url} className="text-sm bg-awtgreen p-2 rounded-md  text-white block">
                                                    {subpage.name}
                                                </a>
                                                {subpage.grandsubpages && (
                                                    <div className="space-y-2 pt-2">
                                                        {subpage.grandsubpages.map((grandsubpage, grandIndex) => (
                                                            <div key={grandIndex} className="">
                                                                <a href={grandsubpage.url} className="text-xs text-white bg-[#996A2C] p-2 rounded-md block">
                                                                    {grandsubpage.name}
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sitemap;

