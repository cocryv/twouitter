import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import Timeline from '../../components/Timeline';
import User from '../../models/User';
import dbConnect from '../../lib/dbConnect'
import { useRouter } from 'next/router';
import verifyToken from '../../lib/verifyToken';
import Profil from '../../components/Profil';
import ProfilTimeline from '../../components/ProfilTimeline';
import Skeleton from '../../components/Skeleton';

export default function username({connected,user,target}) {

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

    const profil = await User.findOne({username: params.username }).populate('follows.user')
    let followers = await User.find({follows: profil})
    if(profil != null){
        target = {
            _id:profil.id,
            name:profil.name,
            username:profil.username,
            email:profil.email,
            bio:profil.bio|| null,
            location:profil.location || 'Everywhere',
            profilPicture:profil.profilPicture || null,
            followings: JSON.parse(JSON.stringify(profil.follows)),
            followers: JSON.parse(JSON.stringify(followers)),
            createdAt:JSON.stringify(profil.createdAt)
        } 
        console.log(target)
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
      connected: connected,
      user: user,
      target: target
    }, // will be passed to the page component as props
  }
}


