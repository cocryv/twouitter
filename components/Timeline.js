import React from 'react';
import { v4 as uuidv4 } from 'uuid';


const Timeline = ({tweets}) => {
    return (
        <div>
            {tweets ? tweets.map(tweet => (
                <div className='flex border border-gray-300'>
                    <div className='pt-2 px-4'>
                        <img className='inline-block h-9 w-full rounded-full' src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg" alt="" />
                    </div>
                    <div className='flex flex-col w-full  pt-2'>
                        <div>
                            <p>{tweet.user.name} - <span>@{tweet.user.username}</span> ~ {new Date(tweet.date).toLocaleDateString()}</p>
                        </div>
                        <div className='py-2'>
                            {tweet.body}
                        </div>
                        <div className='flex py-2 gap-4'>
                            <span>{tweet.comments ? tweet.comments.length : "0" } com</span>
                            <span>{tweet.retweets ? tweet.retweets.length : "0" } rt</span>
                            <span>{tweet.favs ? tweet.favs.length : "0" } like</span>
                        </div>
                    </div>
                </div>
            )) : ''}
        </div>
    );
};

export default Timeline;