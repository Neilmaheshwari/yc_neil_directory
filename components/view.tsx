import React from 'react';
import Ping from './ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

import { after } from 'next/server' 
import { cp } from 'fs';


const View = async ( {id}: {id:string}) => {

    const result = await client
        .withConfig({useCdn:false})
        .fetch(STARTUP_VIEWS_QUERY, {id});
    console.log("Result", result);
    const totalviews = result.views;
    console.log("Total views", totalviews);
   after( async ()=> await writeClient
    .patch(id)
    .set({views: totalviews + 1})
    .commit())

    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping/>
            </div>
            <p className='view-text'>
                <span className='font-black'>
                   Views:{totalviews}
                </span>
            </p>
        </div>
    );
};

export default View;