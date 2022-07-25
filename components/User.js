import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useState} from 'react';

const User = ({following,user}) => {

    const router = useRouter();


    return (
        <Link href={`/profil/${following.username}`}>
            <div className='flex border border-gray-700 cursor-pointer' onClick={()=>{}}>
                    <div className='py-2 px-4'>
                    <Link href={`/profil/${following.username}`}>
                        <a href="">
                            {following.profilPicture ? 
                            <img className='inline-block h-9 w-10 rounded-full cursor-pointer' src={following.profilPicture} alt="" />
                            : <div className='inline-block h-9 w-10 rounded-full cursor-pointer'>
                                <Image src="/user.png" alt="me" width='36' height='36' className='inline-block h-9 w-full rounded-full cursor-pointer' />
                            </div>
                            }
                        </a>
                    </Link>
                    </div>
                    <div className='flex flex-col w-full  pt-2'>
                        <div>
                            <p className='flex gap-2'>
                            <Link href={`/profil/${following.username}`}>
                                <span className='cursor-pointer font-bold hover:underline'>
                                    {following.name}
                                </span> 
                            </Link>
                            <Link href={`/profil/${following.username}`}>
                                <span className='cursor-pointer opacity-50'>
                                    @{following.username}
                                </span> 
                            </Link>
                             {/* {new Date(JSON.parse(tweet.date)).toLocaleDateString()} */}
                             </p>
                        </div>
                    </div>
                </div>
        </Link>
    );
};

export default User;