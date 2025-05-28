import React from 'react';

const Ping = () => {
    return (
        <div className='relative'>
            <div className='absolute -top-1 -left-4'>
                <span className='flex size-[11px]'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                    <span className='inline-flex size-[11px] bg-primary rounded-full'></span>
                </span>
            </div>
        </div>
    );
};

export default Ping;