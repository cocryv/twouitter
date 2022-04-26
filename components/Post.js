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
        })

        updateTweets(newTweet);
    }

    return (
        <div className='flex items-center w-full'>
            <div className='w-12 px-4'>
                <p></p>
            </div>
             <form className='w-full flex '>
                <input ref={bodyInput} class="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full" type="text" id="tweet" name="tweet" placeholder='What is happening?'/>
                <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
            </form> 
        </div>
    );
};

export default Post;