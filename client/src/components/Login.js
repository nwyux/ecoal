import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';
import { NavLink } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userToken, setUserToken] = useCookie('token', '0');
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate()

    async function login() {
        setLoading(true);
        const response = (await axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        })).data;
        if (response.error) {
            setError(response.error);
        } else {
            setUserToken(response['access_token'], {
                days: 365,
                SameSite: 'Strict',
                Secure: true,
            });
            setLogged(true);
            console.log(response['access_token']);
        }
        setLoading(false);
    }

    if (logged)
        window.location.href = '/'
    return (
        <div className="flex h-screen relative justify-center items-center">
            <div className='flex absolute top-24 z-20 justify-center bg-vert rounded-full items-center mb-4'>
                <NavLink to='/login' className="text-2xl font-semibold bg-vertfonce rounded-full py-4 px-11 text-blanc">Login</NavLink>
                <NavLink to='/register' className="text-2xl font-semibold py-4 px-6 text-vertfonce">Register</NavLink>
              </div>
              <div className="w-full p-4 bg-blanc absolute top-24 h-screen rounded-3xl">
                <form onSubmit={login} className='mt-24'>
                  <input
                        type="email"
                        placeholder="Email"
                        className="w-full shadow-xl p-3 mb-6 bg-vert text-vertfonce rounded-xl placeholder:text-vertfonce placeholder:text-xl placeholder:font-bold"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 shadow-xl mb-6 bg-vert text-vertfonce rounded-xl placeholder:text-vertfonce placeholder:text-xl placeholder:font-bold"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <button
                    className="w-full p-3 mt-6 bg-vertfonce shadow-2xl text-blanc rounded-xl font-bold"
                    onClick={login}
                    disabled={loading}
                >
                    Login
                </button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="text-vertfonce flex gap-1 font-bold mt-4">
                  <p>You don't have an account?</p>
                  <NavLink to='/register' className="text-vert hover:underline">Register here</NavLink>
                </div>
            </div>
        </div>
    )
}