import React from 'react';
import MyModal from './headlessui/modal';
import ProfilTimeline from './ProfilTimeline';
import { useState, useEffect } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profil = ({user,target}) => {

    const router = useRouter('/A');
    const [name,setName] = useState(target.name)
    const [bio,setBio] = useState(target.bio)
    const [location,setLocation] = useState(target.location)
    const [profilPicture,setProfilPicture] = useState(target.profilPicture)
    const [isFollowing,setIsFollowing] = useState(false)
    console.log(target)


    useEffect(()=>{
        setName(target.name)
        setBio(target.bio)
        setLocation(target.location)
        setProfilPicture(target.profilPicture)

        user.followings.map((item)=>{
            if(item.user == target._id){
                setIsFollowing(true)
            }
        })
    },[user])

    const updateInfo = (data) => {
        setName(data.name)
        setBio(data.bio)
        setLocation(data.location)
        setProfilPicture(data.profilPicture)
    }

    const handleFollow = () => {
        axios.post(`/api/user/follow/${target._id}`,
        {user: user._id}
        )
        .then(res=>{
            console.log(res)
            if(res.status == 200){
                isFollowing ? setIsFollowing(false) : setIsFollowing(true)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='relative'>
            <div className='w-full h-48 bg-slate-400'>

            </div>
            {profilPicture ? 
            <img className="absolute top-32 left-6 inline object-cover w-32 h-32 mr-2 rounded-full" src={profilPicture} alt="Profile image"/>
            : 
            <div className="absolute top-32 left-6 w-32 h-32 rounded-full cursor-pointer">
                <Image src="/user.png" alt="me" width='128' height='128' className='rounded-full' />
            </div>}
            
            <div className='flex items-end justify-end mr-4 mt-4'>
                { user.username != target.username ?
                    <div onClick={handleFollow} className='flex items-center justify-center bg-white text-black font-bold w-20 h-9 rounded-3xl cursor-pointer hover:bg-slate-100'>{isFollowing ? 'Unfollow' : 'Follow'}</div>
                :
                <MyModal updateInfo={updateInfo} user={user}/>
                }
            </div>
            <div className="flex flex-col m-6">
                <div className='text-2xl font-bold'>{name}</div>
                <div className='opacity-70'>@{target.username}</div>
                <div className='pt-4'>{bio}</div>
                <div className='flex flex-row mt-4 gap-4'>
                    <div className='flex items-center justify-center gap-2'>
                        <svg fill="currentColor" width={30} height={30} viewBox="0 0 24 24" aria-hidden="true" className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path><path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path></g></svg>
                        <span>{location}</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <svg fill="currentColor" width={30} height={30} viewBox="0 0 24 24" aria-hidden="true" className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path><circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle><circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle><circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle><circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle></g></svg>                        
                        <span>{new Date(JSON.parse(target.createdAt)).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className='flex flex-row mt-4 gap-4'>
                <div className='cursor-pointer hover:underline underline-offset-4' onClick={()=>{router.push(`/profil/${target.username}/follow?type=Following`)}}>
                        <span className='font-bold'>{target.followings.length}</span> following
                    </div>
                    <div className='cursor-pointer hover:underline underline-offset-4' onClick={()=>{router.push(`/profil/${target.username}/follow?type=Followers`)}}>
                        <span className='font-bold'>{target.followers.length}</span> followers
                    </div>
                </div>
            </div>
            <ProfilTimeline user={user} target={target._id}/>
        </div>
    );
};

export default Profil;