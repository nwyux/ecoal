import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function EducComposents() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/articles")
            .then(res => setArticles(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="mb-4 min-h-screen flex justify-center items-center mt-8">
            <div className="w-11/12 flex flex-col m-auto justify-center items-center">
                <h2 className='py-3 my-2 border-l-2 border-noir px-4 text-2xl font-bold'>Tips and Tricks</h2>
                <h3 className='py-1 text-sm'>Are you particularly sensitive to and affected by environmental issues? </h3>
                <p className='ml-3 text-xs'>On this page you'll find a range of tips and advice for everyday life that can make a big difference!</p>
                <div className='mt-2 flex flex-col gap-4 max-w-md m-auto'>
                    <div className='relative mt-4 bg-gradient-to-b from-vert to-transparent shadow-md rounded-md h-20 flex items-center'>
                        <h1 className='text-xs max-w-xs flex-grow pr-4 ml-24'>Use a reusable bottle or water bottle instead of a single-use plastic bottle.</h1>

                        <img className='absolute w-5 left-5' src="/gourde.png" alt="Gourde"/>
                        <img className='absolute w-5 left-14 top-53' src="/bouteilleeau.png" alt="Bouteille d'eau"/>
                        <img className='absolute w-5 left-5 top-7' src="/check.png" alt="Check"/>
                        <img className='absolute w-5 left-14 top-7' src="/cross.png" alt="Cross"/>
                    </div>
                    <div className='relative mt-4 bg-gradient-to-b from-transparent to-vert shadow-md rounded-md h-20 flex items-center'>
                        <h1 className='text-xs max-w-xs flex-grow pr-4 ml-24'>Dry your clothes in the open air rather than in the tumble dryer.</h1>

                        <img className='absolute w-10 left-1' src="/linge.png" alt="linge"/>
                        <img className='absolute w-8 left-12 top-53' src="/sechelinge.png" alt="Seche linge"/>
                        <img className='absolute w-5 left-5 top-7' src="/check.png" alt="Check"/>
                        <img className='absolute w-5 left-14 top-7' src="/cross.png" alt="Cross"/>
                    </div>
                    <div className='relative mt-4 bg-gradient-to-b from-vert to-transparent shadow-md rounded-md h-20 flex items-center'>
                        <h1 className='text-xs max-w-xs flex-grow pr-4 ml-24'>Don't forget to sort through your rubbish to recycle certain items and give them a new lease of life. </h1>

                        <img className='absolute w-16 left-4' src="/tri.png" alt="Tri"/>
                    </div>
                    <div className='relative mt-4 bg-gradient-to-b from-transparent to-vert shadow-md rounded-md h-20 flex items-center'>
                        <h1 className='text-xs max-w-xs flex-grow pr-4 ml-24'>Dry your clothes in the open air rather than in the tumble dryer.</h1>

                        <img className='absolute w-10 left-1' src="/linge.png" alt="linge"/>
                        <img className='absolute w-8 left-12 top-53' src="/sechelinge.png" alt="Seche linge"/>
                        <img className='absolute w-5 left-5 top-7' src="/check.png" alt="Check"/>
                        <img className='absolute w-5 left-14 top-7' src="/cross.png" alt="Cross"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
