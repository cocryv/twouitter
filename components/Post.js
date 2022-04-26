import React, {useRef} from 'react';

const Post = ({updateTweets}) => {

    const bodyInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTweet = {
            user: "626723b035a018cc047423c6",
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
            updateTweets(data);
            bodyInput.current.value = ""
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='flex items-center w-full'>
            <div className='w-12 px-4'>
                <p></p>
            </div>
             <form className='w-full flex flex-col '>
                <input ref={bodyInput} className="px-3 py-4 placeholder-white text-white relative bg-twitter-dark rounded text-base border-0 outline-none focus:outline-none w-full h-8" type="text" id="tweet" name="tweet" placeholder='What is happening?'/>
                <div className='flex justify-end pr-4 pt-4'>
                    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">
                        Tweeter
                    </button>
                </div>
            </form> 
        </div>
    );
};

export default Post;