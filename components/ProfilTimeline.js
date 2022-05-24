import axios from 'axios';
import React, {useEffect,useState} from 'react';
import { Oval } from 'react-loader-spinner';
import Tweet from './Tweet';

const ProfilTimeline = ({target,user}) => {


    const [tweets,setTweets] = useState('')
    const [type,setType] = useState('Tweets')

    useEffect(async ()=>{
        if(type == "Tweets"){
            const req = await axios.get(`/api/tweet?user=${target}`)
            setTweets(req.data)
        }else{
            const req = await axios.get(`/api/user/like/${target}`)
            setTweets(req.data)
        }
        
    },[type,target])

    return (
        <>
            <div className='flex items-center justify-center border-b border-b-slate-600'>
            {
                    type == 'Tweets' ?
                <>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer underline underline-offset-8 decoration-4 hover:bg-slate-700' onClick={()=>{setType('Tweets')}}>
                        Tweets
                    </div>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer hover:bg-slate-700' onClick={()=>{setType('Likes')}}>
                        Likes
                    </div>
                </>
                :
                <>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer  hover:bg-slate-700' onClick={()=>{setType('Tweets')}}>
                        Tweets
                    </div>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer hover:bg-slate-700 underline underline-offset-8 decoration-4' onClick={()=>{setType('Likes')}}>
                        Likes
                    </div>
                </>
                }
                
            </div>
            {tweets ? tweets.map(tweet => (
                <Tweet user={user} tweet={tweet}/>
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