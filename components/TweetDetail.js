import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useState,useRef} from 'react';

const TweetDetail = ({tweet,user}) => {

    const [like,setLike] = useState(tweet.favs.length)
    const [comment,setComment] = useState(tweet.comments)
    const [retweet,setRetweet] = useState(tweet.retweets.length)
    const bodyInput = useRef();
    const router = useRouter();

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const handleLike = () => {
        if(user){
            let data = {user: user._id}
            axios.post(`/api/tweet/like/${tweet._id}`,data)
            .then(res => {
                console.log(res)
                if(res.status === 200){
                    setLike(res.data.length)
                }
            })
            .catch(error => console.log(error))
        }else{
            router.push('/login')
        }
    }

    const handleRetweet = () => {
        if(user){
            let data = {user: user._id}

            axios.post(`/api/tweet/retweet/${tweet._id}`,data)
            .then(res => {
                console.log(res)
                if(res.status === 200){
                    setRetweet(res.data.length)
                }
            })
            .catch(error => console.log(error))
        }else{
            router.push('/login')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTweet = {
            user: user._id,
            body: bodyInput.current.value,
        }

        fetch(`/api/tweet/comment/${tweet._id}`,{
            method: "POST",
            body: JSON.stringify(newTweet),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
              setComment(comment => [...comment,{user:user,body:bodyInput.current.value,date:Date.now()}] );
            bodyInput.current.value = ""
        })
        .catch(err => {
        })
    }

    return (
        <>
            <div className='flex border border-gray-700'>
                <div className='pt-2 px-4'>
                <Link href={`/profil/${tweet.user.username}`}>
                    <a href="">
                        {tweet.user.profilPicture ? 
                        <img className='inline-block h-9 w-10 rounded-full cursor-pointer' src={tweet.user.profilPicture} alt="" />
                        : <div className='inline-block h-9 w-10 rounded-full cursor-pointer'>
                            <Image src="/user.png" alt="me" width='48' height='48' className='inline-block h-9 w-full rounded-full cursor-pointer' />
                        </div>
                        }
                    </a>
                </Link>
                </div>
                <div className='flex flex-col w-full  pt-2'>
                    <div>
                        <p className='flex flex-col'>
                        <Link href={`/profil/${tweet.user.username}`}>
                            <span className=' font-bold cursor-pointer hover:underline'>
                                {tweet.user.name}
                            </span> 
                        </Link>
                        <Link href={`/profil/${tweet.user.username}`}>
                            <span className='cursor-pointer opacity-50'>
                                @{tweet.user.username}
                            </span> 
                        </Link>
                            </p>
                    </div>
                    <div className='py-2 text-2xl'>
                        {tweet.body}
                    </div>
                    <span className='my-2 opacity-50'>
                        {new Date(JSON.parse(tweet.date)).toLocaleDateString('en-US',options)}
                    </span>
                    <div className='flex py-2 gap-8'>
                        <span className='flex hover:text-blue-400 cursor-pointer'>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <g>
                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                </g>
                            </svg>{tweet.comments ? comment.length : "11" } 
                        </span>
                        <span className='flex hover:text-green-400 cursor-pointer'>
                            <svg onClick={handleRetweet} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <g>
                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                                </g>
                            </svg>
                            {tweet.retweets ? retweet : "11" }
                        </span>
                        <span className='flex hover:text-red-500 cursor-pointer'>
                            <svg onClick={handleLike} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                                </g>
                            </svg>                   
                            {tweet.favs ? like : "0" }</span>
                    </div>
                </div>
            </div>
            { user != null ?
            <div className='flex border border-gray-700'>
            <Link href={`/profil/${user.username}`}>
                <a href="" className='p-4'>
                    {user.profilPicture ? 
                    <img className='inline-block h-9 w-10 rounded-full cursor-pointer' src={user.profilPicture} alt="" />
                    : <div className='inline-block h-9 w-10 rounded-full cursor-pointer'>
                        <Image src="/user.png" alt="me" width='48' height='48' className='inline-block h-9 w-full rounded-full cursor-pointer' />
                    </div>
                    }
                </a>
            </Link>
            <form className='w-full flex flex-row items-center'>
            <input autoComplete='off' ref={bodyInput} className="px-3 py-4 placeholder-slate-500 text-white relative bg-twitter-dark rounded text-base outline-none focus:outline-none w-full h-8 opacity-100" type="text" id="tweet" name="tweet" placeholder='Tweet your reply'/>
            <div className='flex justify-end pr-4 pt-4'>
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">
                    Tweet
                </button>
            </div>
        </form> 
        </div>
        : '' }
            
            {comment.map((comment)=>{
                return <Link href={`/tweet/${tweet._id}`}>
                <div className='flex border border-gray-700' onClick={()=>{}}>
                        <div className='pt-2 px-4'>
                        <Link href={`/profil/${comment.user.username}`}>
                            <a href="">
                                {comment.user.profilPicture ? 
                                <img className='inline-block h-9 w-10 rounded-full cursor-pointer' src={comment.user.profilPicture} alt="" />
                                : <div className='inline-block h-9 w-10 rounded-full cursor-pointer'>
                                    <Image src="/user.png" alt="me" width='36' height='36' className='inline-block h-9 w-full rounded-full cursor-pointer' />
                                </div>
                                }
                            </a>
                        </Link>
                        </div>
                        <div className='flex flex-col w-full  pt-2'>
                            <div>
                                <p className='flex flex-col'>
                                    <div className='flex gap-2'>
                                        <Link href={`/profil/${comment.user.username}`}>
                                        <span className='cursor-pointer font-bold hover:underline'>
                                            {comment.user.name}
                                        </span> 
                                        </Link>
                                        <Link href={`/profil/${comment.user.username}`}>
                                            <span className='cursor-pointer opacity-50'>
                                                @{comment.user.username}
                                            </span> 
                                        </Link>
                                    </div>
                                    <div>
                                        <span className='opacity-50'>Replying to </span>
                                        <span className='text-blue-400'> @{tweet.user.username}</span>
                                    </div>
                                 {/* {new Date(JSON.parse(comment.date)).toLocaleDateString()} */}
                                 </p>
                            </div>
                            <div className='py-2'>
                                {comment.body}
                            </div>
                        </div>
                    </div>
            </Link>
            })}
        </>     
    );
};

export default TweetDetail;