import React from 'react'

const advisoryPhilosophy = ({ imgUrl, tilte1, tilte2, content }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div>
          <img
            className="w-auto lg:w-full h-auto object-cover"
            src={imgUrl}
            alt="Our Advisory Philosophy"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 flex flex-col justify-center bg-awtgreen">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            {tilte1} <span className="font-semibold">{tilte2}</span>
          </h2>
          <p className="text-base text-white">
            {content}
          </p>
        </div>
      </div>

    </>
  )
}

export default advisoryPhilosophy
