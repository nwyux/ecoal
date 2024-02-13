import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import { NavLink } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const [registered, setRegistered ] = useState(false)
    const navigate = useNavigate()

    async function register(e) {
        e.preventDefault();
        setLoading(true);
        const response = (await axios.post('http://localhost:8000/api/register', {
            name: name,
            email: email,
            password: password,
        })).data;
        setLoading(false);
        setRegistered(true);
        if (response.error) {
            setError(response.error);
        } else {
            setUserToken(response['access_token'], {
                days: 365,
                SameSite: 'Strict',
                Secure: true,
            });
            setRegistered(true);
        }
    }

      


    if (registered)
    window.location.href = '/'

    return (
        <div className="flex h-screen relative justify-center items-center">
            <div className='flex absolute top-24 z-20 justify-center bg-vert rounded-full items-center mb-4'>
                <NavLink to='/login' className="text-2xl font-semibold text-vertfonce rounded-full py-4 px-11 ">Login</NavLink>
                <NavLink to='/register' className="text-2xl font-semibold py-4 px-6 bg-vertfonce text-blanc rounded-full">Register</NavLink>
              </div>
            <div className="w-full p-4 bg-blanc absolute top-24 h-screen rounded-3xl">
                <form onSubmit={register} className='mt-24'>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 shadow-xl mb-6 bg-vert text-vertfonce rounded-xl placeholder:text-vertfonce placeholder:text-xl placeholder:font-bold"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 shadow-xl mb-6 bg-vert text-vertfonce rounded-xl placeholder:text-vertfonce placeholder:text-xl placeholder:font-bold"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 shadow-2xl mb-6 bg-vert text-vertfonce rounded-xl placeholder:text-vertfonce placeholder:text-xl placeholder:font-bold"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                    className="w-full p-3 mt-6 bg-vertfonce shadow-2xl text-blanc rounded-xl font-bold"
                    onClick={register}
                        disabled={loading}
                    >
                        Register
                    </button>
                </form>
                <div className="text-vertfonce flex gap-1 font-bold mt-4">
                  <p>You already have an account?</p>
                  <NavLink to='/login' className="text-vert hover:underline">Login here</NavLink>
                </div>
            </div>
        </div>
    )
}