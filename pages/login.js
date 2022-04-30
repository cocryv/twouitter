import axios from 'axios';
import React, {useState} from 'react';
import { useRouter } from 'next/router'

const login = () => {

    const router = useRouter();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = { username, password}

        const user = await axios.post('api/auth/login',credentials)

        if(user.status === 200){
            router.push("/message")
        }
    }

    const handleGetUsers = async () => {
        const user = await axios.get('api/test')
        console.log(user)
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" name='username' id='username' onChange={e => setUsername(e.target.value)}  />
                <input type="password" name='password' id='password' onChange={e => setPassword(e.target.value)}  />
                <button>yo</button>
            </form>

            <button onClick={handleGetUsers}>get users</button>
        </div>
    );
};

export default login;