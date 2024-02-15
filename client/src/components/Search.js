import React, { useEffect, useState } from "react";
import axios from "axios";
import useCookie from 'react-use-cookie';
import { NavLink } from "react-router-dom";


export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useCookie('token', '0');

  function handleChange(event) {
    setSearch(event.target.value);
  }

  async function getData() {
    const response = (await axios.get('http://localhost:8000/api/articles/')).data;
    setData(response);
  }

  useEffect(() => {
    getData();
  }, [search]);

  function showArticlesLogged(title, content, leadStory, thumbnailURL, id, created_at) {
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
        <div>
          {/* map the data */}
          {data && data.map((article) => {
            return (
              <div>
                {/* filter the data */}
                {article.title.toLowerCase().includes(search.toLowerCase()) && showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id)}
                </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          {/* map the data */}
          {data && data.map((article) => {
            return (
              <div>
                {/* filter the data */}
                {article.title.toLowerCase().includes(search.toLowerCase()) && showArticlesLogged(article.title, article.content, article.thumbnailURL, article.id, article.leadStory)}
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
    <div className="search mt-28 flex flex-col justify-center m-auto items-center">
      <h2 className="text-marron font-bold text-3xl">Browse through all the articles</h2>
      <label htmlFor="search">Search</label>
      <input type="text" value={search} onChange={handleChange} />
      <div className='container-articles'>
        {allArticles()}
        </div>
    </div>
  )
}