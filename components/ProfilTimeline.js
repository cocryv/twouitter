import axios from 'axios';
import React, {useEffect,useState} from 'react';
import { Oval } from 'react-loader-spinner';
import Tweet from './Tweet';

const ProfilTimeline = ({target}) => {


    const [tweets,setTweets] = useState('')


    console.log(target)
    useEffect(async ()=>{
        const req = await axios.get(`/api/tweet?user=${target}`)
        setTweets(req.data)
    })

    return (
        <>
            <div className='flex items-center justify-center border-b border-b-slate-600'>
                <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer underline underline-offset-8 decoration-4 hover:bg-slate-700'>
                    Tweets
                </div>
                <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer hover:bg-slate-700'>
                    Likes
                </div>
            </div>
            {tweets ? tweets.map(tweet => (
                <Tweet tweet={tweet}/>
            )) : 
            <div className="flex items-center justify-center">
            <Oval
                ariaLabel="loading-indicator"
                height={50}
                width={50}
                strokeWidth={3}
                color="white"
                secondaryColor="#1DA1F2"
            />
            </div>}
        </>
    );
};

export default ProfilTimeline;