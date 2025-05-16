import React from 'react'

const contactInfo = () => {
    return (
        <>
            <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 my-10'>
                <div className='bg-awtgreen p-10 '>
                    <h2 className='text-3xl text-white mb-3'><span className='font-semibold'>AWT</span> Investments</h2>
                    <p className='text-white'>
                        Head Office : <br />
                        AWT Plaza, 2nd Floor, Mall Road Rawalpindi. <br />
                        Board: +92 51 9272379-80 <br />

                        Mr. Qaiser Khan <br />
                        Investor Services <br />
                        Tel Off: (+92-51) 9272379-80 <br />
                        Head Office AWT Investments Ltd. <br />
                        2nd Floor, AWT Plaza, The Mall, Rawalpindi Cantt
                    </p>
                </div>

                <div className='bg-[#DCE3F2] p-10 '>
                    <h2 className='text-3xl font-semibold mb-3'>Branch Offices:</h2>
                    <p>
                        Lahore Branch: <br />
                        1st floor, 33-DD block CCA, phase 4, DHA Cantt <br />
                        Tel: +92-42-35694007, +92-42-35694008 <br />
                        Tel: 042-35860871-5 <br />

                        Karachi Branch: <br />
                        3rd Floor, AWT Plaza, II Chundrigar Road, Karachi. <br />
                        Tel: 021-38658883 <br />

                        Multan Branch: <br />
                        House No 76 Askari Phase I Sher Shah Road, Multan Cantt. <br />
                        Tel: 061-4503616
                    </p>
                </div>
            </div>
        </>
    )
}

export default contactInfo
