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
import Profil from '../components/Profil';
import ProfilTimeline from '../components/ProfilTimeline';
import Skeleton from '../components/Skeleton';

export default function Home({tweets,connected,user}) {

  return(
    <Skeleton connected={connected} user={user}>
      <Profil user={user}/>
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
        name:userQuery.name,
        username:userQuery.username,
        email:userQuery.email,
        bio:userQuery.bio,
        location:userQuery.location,
        createdAt:JSON.stringify(userQuery.createdAt)
      }
    }
  }else{
    connected = false;
    user = null;
  }

  /* find all the data in our database */
  const result = await Tweet.find().populate('user')
  const tweets = result.map((tweet) => ({
    _id: tweet._id.toString(),
    body: tweet.body,
    user: {
      name: tweet.user.name,
      username: tweet.user.username
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


