import axios from 'axios';
import { useRouter } from 'next/router';
import React, {useEffect,useState} from 'react';
import { Oval } from 'react-loader-spinner';

import Tweet from './Tweet';
import User from './User';

const ProfilFollow = ({target,user}) => {
    const router = useRouter()
    const [tweets,setTweets] = useState('')
    const [type,setType] = useState(router.query.type)

    console.log(router.query);

    return (
        <>
            <div className='flex items-center justify-center border-b border-b-slate-600'>
            {
                    type == 'Followers' ?
                <>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer underline underline-offset-8 decoration-4 hover:bg-slate-700' onClick={()=>{setType('Followers')}}>
                        Followers
                    </div>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer hover:bg-slate-700' onClick={()=>{setType('Following')}}>
                        Following
                    </div>
                </>
                :
                <>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer  hover:bg-slate-700' onClick={()=>{setType('Followers')}}>
                        Followers
                    </div>
                    <div className='w-2/4 pt-2 pb-4 flex items-center justify-center cursor-pointer hover:bg-slate-700 underline underline-offset-8 decoration-4' onClick={()=>{setType('Following')}}>
                        Following
                    </div>
                </>
                }
                
            </div>
            {console.log(target.followings)}
            {
                type == 'Following' ?
                user ? target.followings.map(following => (
                    <User following={following.user} user={user}/>
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
                </div>
                :
                user ? target.followers.map(followers => (
                    <User following={followers} user={user}/>
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
                </div>
            }

        </>
    );
};

export default ProfilFollow;