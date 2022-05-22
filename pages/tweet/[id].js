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
import TweetDetail from '../../components/TweetDetail';

export default function username({tweet,connected,user,target}) {

  return(
    <Skeleton connected={connected} user={user}>
      <TweetDetail user={user} tweet={tweet}/>
    </Skeleton>
  )
}

export async function getServerSideProps({req,params}) {

  console.log(params.id)
  await dbConnect()

  let connected;
  let payload;
  let user;
  let target;
  let tweet;

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
//   const result = await Tweet.find().populate('user')
//   const tweets = result.map((tweet) => ({
//     _id: tweet._id.toString(),
//     body: tweet.body,
//     user: {
//       name: tweet.user.name,
//       username: tweet.user.username
//     },
//     date: JSON.stringify(tweet.date)
//   }))
    const data = await Tweet.findOne({_id: params.id }).populate([
        { 
            path: 'comments',
            populate: {
              path: 'user',
              model: 'User'
            } 
         },
         'user'
    ])
    console.log(data)
    if(data != null){
        tweet = {
            _id: data._id.toString(),
            body: data.body,
            user: {
              name: data.user.name,
              username: data.user.username,
              profilPicture:data.user.profilPicture || null,
            },
            date: JSON.stringify(data.date),
            favs: JSON.parse(JSON.stringify(data.favs)),
            comments: JSON.parse(JSON.stringify(data.comments)),
            retweets: JSON.parse(JSON.stringify(data.retweets)),
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
      tweet: tweet,
      connected: connected,
      user: user,
    }, // will be passed to the page component as props
  }
}


