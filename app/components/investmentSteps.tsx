import React from 'react'

const investmentSteps = () => {
    return (
        
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 my-10'>
                <div className='bg-awtgreen p-10 '>
                    <p className='text-lg text-white'>Step 1</p>
                    <h2 className='text-3xl text-white mb-3 font-semibold'>Opening Account</h2>
                    <p className='text-white'>
                        By following below steps investors can open their account. Investors need to open an account before making any investment. <br />

                        Kindly complete the account opening form to begin your investment:
                        Click here to download the form.
                        You are required to fill Individual/Corporate Account opening Form along with
                        Investment Form (Indicate interested fund types and amount of investment)
                        OR
                        Collect Account Opening Form from AWT Investments regional offices
                        i.e. Karachi, Lahore and Islamabad

                    </p>
                </div>

                <div className='bg-primary p-10 '>
                    <p className='text-lg text-white'>Step 2</p>
                    <h2 className='text-3xl text-white mb-3 font-semibold'>Make Payment</h2>
                    <p className='text-white'>
                        Investment can be made in the form of : <br />
                        1st floor, 33-DD block CCA, phase 4, DHA Cantt <br />
                        Cross Cheque
                        Pay Order
                        Demand Draft
                    </p>
                    <p className='text-white p-12 bg-white bg-opacity-10 rounded-xl font-bold mt-5'>
                    Payment can be made in favor of “CDC Trustee – “(Name of fund)”
                    </p>
                </div>
            </div>
        
    )
}

export default investmentSteps
