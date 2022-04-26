import React from 'react';
import { v4 as uuidv4 } from 'uuid';


const Timeline = ({tweets}) => {
    return (
        <div>
            {tweets ? tweets.map(tweet => (
                <div className='flex items-center border border-gray-300'>
                    <div className='w-12 px-4 bg-yellow-400'>
                        {/* TODO: display profil pic */}
                    </div>
                    <div className='flex flex-col w-full bg-yellow-400 pt-2'>
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