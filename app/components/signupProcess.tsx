import React from 'react'

const signupProcess = ({signUpProcess , title}) => {
  return (
    <>
    <div className='container'>
        <h2 className='text-2xl font-semibold font-sans'>{title}</h2>
        <div className='grid grid-cols-1 md:grid-cols-5 sm:grid-cols-2 gap-5 py-10'>
          {signUpProcess?.map((steps, index)=>(

            <div key={index}>
                <h3 className='text-8xl font-black -mb-8 text-black text-opacity-5'>{steps.blockNumber}</h3>
                <h3 className='text-lg font-semibold'>{steps.blocktitle}</h3>
                <p> {steps.blockcontent}</p>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

export default signupProcess
