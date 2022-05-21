import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Timeline from '../components/Timeline';
import Tweet from '../models/Tweet';
import User from '../models/User';
import dbConnect from '../lib/dbConnect'
import { useRouter } from 'next/router';
import verifyToken from '../lib/verifyToken';
import Skeleton from '../components/Skeleton';

export default function Home({tweets,connected,user}) {

  const router = useRouter();

  const [allTweets,setAllTweets] = useState();

  useEffect(() => {
    if(tweets){
      setAllTweets(tweets);
    }
  }, [])

  const updateTweets = (tweet) => {
    let newTab = [...allTweets, tweet];
    setAllTweets(newTab);
  }
  

  return (
    <Skeleton tweets={tweets} connected={connected} user={user}>
      {
        connected ? 
        <div className="flex justify-center items-center h-36 border-t border-gray-700">
          <Post updateTweets={updateTweets} user={user}  />
        </div> :
      ''
      }
      <Timeline tweets={allTweets}/>
    </Skeleton>
  )
}

export async function getServerSideProps({req}) {

  await dbConnect()

  let connected;
  let payload;
  let user;

  if(req.cookies.auth){
    
    let payload = verifyToken(req.cookies.auth);
    if(payload){
      connected = true;
      let userQuery = await User.findOne({email: payload.username})

      user = {
        _id:userQuery.id,
        username:userQuery.username,
        profilPicture: userQuery.profilPicture || null
      }
    }
  }else{
    connected = false;
    user = null;
  }

  /* find all the data in our database */
  const result = await Tweet.find().sort([['date', -1]]).populate('user')
  const tweets = result.map((tweet) => ({
    _id: tweet._id.toString(),
    body: tweet.body,
    user: {
      name: tweet.user.name,
      username: tweet.user.username,
      profilPicture: tweet.user.profilPicture || null
    },
    date: JSON.stringify(tweet.date)
  }))

  return {
    props: {
      tweets: tweets,
      connected: connected,
      user: user
    }, // will be passed to the page component as props
  }
}


