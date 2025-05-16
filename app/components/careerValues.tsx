import React from 'react'

const careerValues = ({ corevalues, corevaluesectitle1, corevaluesectitle2 }) => {
  return (
    <>
    <div className="container p-6 md:p-8 my-10 bg-awtgreen">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-normal text-center md:text-left">
                    {corevaluesectitle1} <span className="font-semibold">{corevaluesectitle2}</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {corevalues?.map((cv, index) => (
                        <div
                            key={index}
                            className="mt-5"
                        >
                            <img
                                src={cv.iconurl}
                                alt={cv.title}
                                className="w-16 h-16 mx-auto md:mx-0"
                            />
                            <h3 className="text-white mt-4 text-base md:text-lg font-medium text-center md:text-left">
                                {cv.title}
                            </h3>
                            <p className="mt-2 text-sm md:text-base text-white text-center md:text-left leading-relaxed">
                                {cv.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    </>
  )
}

export default careerValues
