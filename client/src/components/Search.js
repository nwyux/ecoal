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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/articles/');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  function showArticlesLogged(title, content, leadStory, thumbnailURL, id) {
    return (
      <div className='flex flex-col hover:scale-105 transition-all duration-200 border-2 rounded-3xl border-gray-200 relative w-80 sm:w-96 max-h-34 my-6' key={id}>
        <NavLink to={"/article/" + id} className="hover:underline">
          <h3 className='font-bold text-xl absolute bottom-2 left-2'>{title}</h3>
          <div className='flex max-w-80 sm:max-w-96 max-h-36'>
            <img className='w-full object-cover rounded-3xl' src={`http://localhost:8000/${thumbnailURL}`} alt={title} />
          </div>
        </NavLink>
      </div>
    );
  }

  function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {
    return (
      <div className='flex flex-col border-2 rounded-3xl border-gray-200 relative w-80 sm:w-96 max-h-34 my-6' key={id}>
        <h3 className='font-bold text-xl absolute bottom-2 left-2'>{title}</h3>
        <div className='flex max-w-80 sm:max-w-96 max-h-36'>
          <img className='w-full object-cover rounded-3xl' src={`http://localhost:8000/${thumbnailURL}`} alt={title} />
        </div>
      </div>
    );
  }

  function needLogin() {
    if (userToken === '0') {
      return (
        <div className=''>
          <h3 className='font-bold'>Log in or register to read this article</h3>
          <div className='flex gap-1'>
            <NavLink to="/login/" className="underline">Log in</NavLink>
            <NavLink to="/register/" className="underline">Register</NavLink>
          </div>
        </div>
      );
    }
  }

  function allArticles() {
    return (
      <div>
        {data && data.map((article) => (
          <React.Fragment key={article.id}>
            {article.title.toLowerCase().includes(search.toLowerCase()) && (userToken === '0'
              ? showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id)
              : showArticlesLogged(article.title, article.content, article.leadStory, article.thumbnailURL, article.id)
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="search min-h-screen flex flex-col mt-28 m-auto items-center">
      <h2 className="text-marron font-bold text-3xl">Browse through all the articles</h2>
      <label htmlFor="search" className="mt-6">Search</label>
      <input className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg" type="text" value={search} onChange={handleChange} />
      <div className='container-articles'>
        {loading ? <p>Loading...</p> : allArticles()}
      </div>
    </div>
  );
}
