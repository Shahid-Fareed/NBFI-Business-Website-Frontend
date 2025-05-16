import React from 'react'

const keyFeatures = ({ title1, title2 }) => {
    const content = ['mango', 'apple', 'grapes', 'banana', 'Pear', 'Pineapple', 'guava']
    return (
        <>
            <div className='container bg-awtgreen p-10 grid grid-cols-2 gap-10 items-center'>
                <div>
                    <h2 className='text-4xl text-white mb-3'>{title1} <span className='font-semibold'> {title2}</span></h2>
                    <p className='text-white'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia. Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                </div>
                <div>
                    {content.map((item, index) => (
                        <p key='index' className='text-white columns-2'> {item} </p>
                    ))}
                    {/* <div>
                    <p className='text-white columns-2'>
                        Portfolio Value <br />
                        Portfolio Allocation <br />
                        Funds performance <br />
                        E-transactions <br />
                        Portfolio analytics <br />
                        Tax calculator <br />
                        Funds NAV <br />
                    </p>
                </div> */}
                </div>
            </div>
        </>
    )
}

export default keyFeatures
