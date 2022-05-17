import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import Timeline from '../../components/Timeline';
import Tweet from '../../models/Tweet';
import User from '../../models/User';
import dbConnect from '../../lib/dbConnect'
import { useRouter } from 'next/router';
import verifyToken from '../../lib/verifyToken';
import Profil from '../../components/Profil';
import ProfilTimeline from '../../components/ProfilTimeline';
import Skeleton from '../../components/Skeleton';

export default function username({tweets,connected,user,target}) {

  return(
    <Skeleton connected={connected} user={user}>
      <Profil user={user} target={target}/>
    </Skeleton>
  )
}

export async function getServerSideProps({req,params}) {

    console.log(params.username)
  await dbConnect()

  let connected;
  let payload;
  let user;
  let target;

  if(req.cookies.auth){
    
    let payload = verifyToken(req.cookies.auth);
    if(payload){
      connected = true;
      let userQuery = await User.findOne({email: payload.username})

      user = {
        _id:userQuery.id || null,
        name:userQuery.name || null,
        username:userQuery.username || null,
        email:userQuery.email || null,
        bio:userQuery.bio || null,
        location:userQuery.location || null,
        profilPicture:userQuery.profilPicture || null,
        createdAt:JSON.stringify(userQuery.createdAt)
      }
    }
  }else{
    connected = false;
    user = null;
  }

  console.log(user);
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

    const profil = await User.findOne({username: params.username })
    if(profil != null){
        target = {
            _id:profil.id,
            name:profil.name,
            username:profil.username,
            email:profil.email,
            bio:profil.bio|| null,
            location:profil.location || 'Everywhere',
            profilPicture:profil.profilPicture || null,
            createdAt:JSON.stringify(profil.createdAt)
        }
    }else{
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

  return {
    props: {
      tweets: tweets,
      connected: connected,
      user: user,
      target: target
    }, // will be passed to the page component as props
  }
}


