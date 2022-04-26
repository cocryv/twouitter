import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import Timeline from '../components/Timeline';

export default function Home({tweets}) {

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
    <div className="bg-white dark:bg-dim-900">
      <Head>
        <title>Twouitter</title>
        <meta name="description" content="Twitter clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto h-screen bg-slate-200">
        <div className='flex flex-row justify-center'>
          <div className='w-68 xs:w-88 xl:w-275 h-screen bg-red-600'>
          </div>
          <div className='w-full sm:w-600 h-screen bg-red-500'>
            <div className="flex justify-center items-center h-14 bg-white px-4">
              <div className='flex w-full'>
                <h1>Home</h1>
              </div>
            </div>
            <div className="flex justify-center items-center h-36 bg-blue-400">
              <Post updateTweets={updateTweets}  />
            </div>
            <Timeline tweets={allTweets}/>
          </div>
          <div className='hidden md:block w-290 lg:w-350 h-screen bg-red-400'>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export async function getServerSideProps(){

  const data = await fetch('http://localhost:3000/api/tweet')
  const tweets = await data.json()

  return{
      props: {
          tweets
      }
    }

}

