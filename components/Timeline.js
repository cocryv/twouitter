import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Tweet from './Tweet';


const Timeline = ({tweets}) => {
    return (
        <div>
            {tweets ? tweets.map(tweet => (
                <Tweet tweet={tweet}/>
            )) : ''}
        </div>
    );
};

export default Timeline;