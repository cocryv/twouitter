import axios from 'axios';
import React, {useState} from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head';

const register = () => {

    const router = useRouter();

    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState("hidden")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = { email, name, username, password}

        axios.post('api/user',credentials)
        .then(res => {
            if(res.status === 201){
                setSuccess('');
            }
        })
        .catch(error => console.log(error))

    }

    return (
        <div className=" bg-slate-800 min-h-screen flex items-center">
            <Head>
                <title>Register in Twouitter.</title>
                <meta name="description" content="Twouitter register" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='container bg-white w-600 rounded p-5'>
            <div className={`p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 ${success}`} role="alert">
            <span class="font-medium">You have been successfully registered !</span> <span className='font-bold hover:underline cursor-pointer' onClick={()=>{router.push("/login")}}>Click here to connect.</span>
            </div>
                <div className="flex justify-center relative">
                    <div className="absolute left-3 hover:text-red-400 cursor-pointer" onClick={()=>{router.push("/")}}>
                        X
                    </div>
                    <div>
                        <svg viewBox="0 0 24 24" class="w-8 h-8 text-blue-400 dark:text-white" fill="#1DA1F2">
                            <g>
                                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-semibold my-5'>Inscrivez-vous à Twouitter</h1>

                    <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => handleSubmit(e)}>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                            E-mail
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="johndoe@gmail.com" onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="fullname">
                            Full name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fullname" type="text" placeholder="John Doe" onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="johndoee78" onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-center">
                        <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full">
                            Register
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default register;