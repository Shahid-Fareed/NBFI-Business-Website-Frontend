import React from 'react'

const textwithImage = () => {
    return (
        <div className='container px-4 sm:px-0 py-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 items-center'>
                <div className=''>
                    <p className='text-base'>
                        Mutual funds are established by a Trust Deed between the AMC and the trustee under the Non-Banking Finance Companies (Establishment and Regulation) Rules, 2003 (the “Rules”).   Under the regulations an independent trustee registered with the SECP has custody of all mutual fund assets.  All Mutual Funds are obliged to appoint an independent trustee, which can be a scheduled bank having a minimum of ‘AA-’ rating and has been in business for at least five years or a subsidiary of scheduled bank having a minimum of AA- rating or an investment finance company having a minimum of AA- rating or a central depository company. The trustee is obligated to ensure that:
                    </p>
                </div>
                <div className=''>
                    <img src='/assets/about-banner.png' alt='Image Description' className='object-cover w-full' />
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10'>
                <div className='p-5 bg-white border border-[#D7D7D7]'>
                    <p>The asset management company Invests the fund’s assets in accordance with the approved investment policy and authorized investments of the mutual fund;</p>
                </div>
                <div className='p-5 bg-white border border-[#D7D7D7]'>
                    <p>The asset management company Invests the fund’s assets in accordance with the approved investment policy and authorized investments of the mutual fund;</p>
                </div>
                <div className='p-5 bg-white border border-[#D7D7D7]'>
                    <p>The asset management company Invests the fund’s assets in accordance with the approved investment policy and authorized investments of the mutual fund;</p>
                </div>

            </div>
        </div>
    )
}

export default textwithImage
