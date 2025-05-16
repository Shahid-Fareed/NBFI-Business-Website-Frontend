import React from 'react'

const ourInvestmentProcess = ({ OurInveProcessCard, OurInveProcessT1, OurInveProcessT2 }) => {
    return (
        <>
            <div className='py-12'>
                <h2 className='text-4xl text-primary font-normal'>{OurInveProcessT1} <span className='text-awtgreen font-semibold'>{OurInveProcessT2}</span></h2>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    {OurInveProcessCard?.map((cv, index) => (
                        <div key={index} className="bg-[#F5F5F5] p-6 mt-4 hover:border hover:border-primary">
                            <div className="">
                                <img src={cv.iconurl} alt={cv.title} className="" />
                                <h3 className="mt-4 text-lg font-medium">{cv.title}</h3>
                                <p>{cv.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ourInvestmentProcess
