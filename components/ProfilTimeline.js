import React from 'react';

const ProfilTimeline = () => {
    return (
        <div className='flex items-center justify-center border-b border-b-slate-600'>
            <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer underline underline-offset-8 decoration-4 hover:bg-slate-700'>
                Tweets
            </div>
            <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer hover:bg-slate-700'>
                Likes
            </div>
        </div>
    );
};

export default ProfilTimeline;