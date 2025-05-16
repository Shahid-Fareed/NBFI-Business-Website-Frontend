import React from 'react'

const investmentBasic = () => {
    return (
        <div className='container px-4 sm:px-0 py-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div>
                    <img
                        className="w-auto lg:w-full h-full object-cover"
                        src='/assets/about-banner.png'
                        alt="title"
                    />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex flex-col justify-center bg-primary">
                    <h2 className="text-3xl md:text-4xl text-white">
                    Investment Basics
                    </h2>
                    <h2 className="text-xl md:text-2xl text-white mb-4 font-normal">
                    Factors to consider before investing
                    </h2>
                    <p className="text-base text-white">
                    Investment is about putting your money to work now to provide a source of income and capital for the future. It can help you to both create and preserve your wealth. By taking an appropriate level of risk you may have the opportunity to earn potentially higher long-term returns. It is important to remember that the value of investments, and the income from them, may fall or rise and investors may get back less than they invested. Most individuals invest in order to generate a profit or positive return over a reasonable time frame. The foundation of any successful investment strategy is a clear understanding of your short, medium and long-term financial objectives as the investment strategy you select will be based on the your financial objectives.
                    </p>
                </div>
            </div>
            <div className='bg-[#DCE3F2] p-6'>
                <h3 className='text-2xl font-semibold mb-3'>Understand your needs</h3>
                <p>Even though investors are always trying to make money, they come from diverse backgrounds and have different needs. Therefore investment solutions and methods should be personalized for each investor.</p>
            </div>
        </div>

    )
}

export default investmentBasic
