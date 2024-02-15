import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import useCookie from 'react-use-cookie';
// import './Articles.css';

export default function Articles() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useCookie('token', '0');
  const { id } = useParams();


  async function getData() {
    setLoading(true);
    const response = (await axios.get('http://localhost:8000/api/articles')).data;
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function showArticlesLogged(title, content, leadStory, thumbnailURL, id, created_at) {

    if (content == 1) {
    return (
      <div className='flex flex-col border-2 border-gray-200 relative max-w-lg max-h-56'>
            <NavLink className="readmore" to={"/article/" + id}>
          <h3 className='font-bold text-xl absolute bottom-0'>{title}</h3>
          <img className='w-52 object-cover' src={'http://localhost:8000/'+thumbnailURL} alt={title} />
          {/* <p className="articletext text-sm">{created_at}</p> */}
  
            </NavLink>
        </div>
    )
    }; 
    
    if (id == '1') {
      return (
        <div className='flex flex-col border-2 rounded-3xl border-gray-200 relative w-80 sm:w-96 max-h-34'>
            <NavLink className="hover:" to={"/article/" + id}>
          <h3 className='font-bold text-xl absolute bottom-2 left-2'>{title}</h3>
          <div className='flex max-w-80 sm:max-w-96 max-h-36'>
          <img className='w-full object-cover rounded-3xl' src={'http://localhost:8000/'+thumbnailURL} alt={title} />
          </div>
          {/* <p className="articletext text-sm">{created_at}</p> */}
  
            </NavLink>
        </div>
      )
    }
}

  function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {

      return (
        <div className='flex flex-col border-2 rounded-3xl border-gray-200 relative w-80 sm:w-96 max-h-34'>
          <h3 className='font-bold text-xl absolute bottom-2 left-2'>{title}</h3>
          <div className='flex max-w-80 sm:max-w-96 max-h-36'>
          <img className='w-full object-cover rounded-3xl' src={'http://localhost:8000/'+thumbnailURL} alt={title} />
          </div>
          {/* <p className="articletext text-sm">{created_at}</p> */}  
        </div>
      )
  }

  function needLogin() {
    if (userToken === '0'){
    return (
      <div className=''>
        <h3 className='font-bold'>Log in or register to read this article</h3>
        <div className='flex gap-1'>
        <NavLink to="/login/" className="underline">Log in</NavLink>
        <NavLink to="/register/" className="underline">Register</NavLink>
        </div>
      </div>
    )
    }
  }


  function allArticles() {
    if (userToken === '0') {
      return (
        <div className='flex flex-wrap py-2'>
          {data && data.map((article) => {
            return (
              <div className='flex flex-col'>
                {showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id, article.created_at)}
                {needLogin()}
                </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div className='flex flex-col'>
          {data && data.map((article) => {
            return (
              <div className='flex rounded-2xl py-3 flex-col'>
                {showArticlesLogged(article.title, article.leadStory, article.content, article.thumbnailURL, article.id, article.created_at)}
                </div>
            )
          })}
        </div>
      )
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  } else {
    allArticles();
  }

  return (
    <div className='container-articles mt-28 flex justify-center items-center'>
      {data && allArticles()}
    </div>
  )
}