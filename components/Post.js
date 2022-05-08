import React, {useRef} from 'react';

const Post = ({updateTweets,user}) => {

    const bodyInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTweet = {
            user: user._id,
            body: bodyInput.current.value,
        }

        fetch('/api/tweet',{
            method: "POST",
            body: JSON.stringify(newTweet),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.date = JSON.stringify(data.date)
            updateTweets(data);
            bodyInput.current.value = ""
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='flex w-full'>
            <div className='px-4'>
            <img className='inline-block h-9 w-full rounded-full' src="https://pbs.twimg.com/profile_images/1308769664240160770/AfgzWVE7_normal.jpg" alt="" />
            </div>
             <form className='w-full flex flex-col '>
                <input ref={bodyInput} className="px-3 py-4 placeholder-white text-white relative bg-twitter-dark rounded text-base border-0 outline-none focus:outline-none w-full h-8" type="text" id="tweet" name="tweet" placeholder='What is happening?'/>
                <div className='flex justify-end pr-4 pt-4'>
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">
                        Tweet
                    </button>
                </div>
            </form> 
        </div>
    );
};

export default Post;