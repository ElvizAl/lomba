import Image from 'next/image';
import React from 'react';

const Loading = () => {
    return (
        <>
            <div className='flex justify-center items-center h-screen w-full bg-gradient-to-b from-blue-600 to-blue-500 fixed top-0 left-0 right-0 z-50'>
                <div className='flex flex-col items-center animate-pulse'>
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-44"
                        priority
                    />
                    <h6 className='text-white font-bold text-4xl'>Glofin</h6>
                </div>
            </div>
        </>
    )
}

export default Loading;
