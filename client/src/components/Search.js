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
      <div className='flex flex-col hover:scale-105 text-blanc transition-all duration-200 border-2 rounded-3xl border-gray-200 relative w-80 sm:w-[400px] max-h-34 my-6' key={id}>
        <NavLink to={"/article/" + id} className="hover:underline">
        <h3 className='font-bold text-xl absolute bottom-0 p-1 left-0 backdrop-blur-sm rounded-b-xl bg-gray-500 w-full bg-opacity-45'>{title}</h3>
          <div className='flex max-w-80 sm:max-w-[400px] max-h-36'>
            <img className='w-full object-cover rounded-3xl' src={`http://localhost:8000/${thumbnailURL}`} alt={title} />
          </div>
        </NavLink>
      </div>
    );
  }

  function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {
    return (
        <div className='flex cursor-not-allowed flex-col text-blanc transition-all duration-200 border-2 rounded-3xl border-gray-200 relative w-80 sm:w-[400px] max-h-34 my-6' key={id}>
        <h3 className='font-bold text-xl absolute bottom-0 p-1 left-0 backdrop-blur-sm rounded-b-xl bg-gray-500 w-full bg-opacity-45'>{title}</h3>
        <div className='flex max-w-80 sm:max-w-[400px] max-h-36'>
          <img className='w-full object-cover rounded-3xl' src={`http://localhost:8000/${thumbnailURL}`} alt={title} />
        </div>
      </div>
    );
  }

  function needLogin() {
    if (userToken === '0') {
      return (
        <div className='fixed z-20 bottom-0 bg-marron rounded-t-lg p-4 text-blanc w-screen sm:w-[450px] flex flex-col justify-center items-center'>
          <h3 className='font-bold mb-4 text-xl text-center'>Log in or register to read our articles</h3>
          <div className='flex gap-2'>
            <NavLink to="/login/" className="p-2 bg-vertfonce hover:bg-vert transition-all duration-150 rounded-lg">Log in</NavLink>
            <NavLink to="/register/" className="p-2 bg-vertfonce hover:bg-vert transition-all duration-150 rounded-lg">Register</NavLink>
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
      <h2 className="text-marron font-bold text-3xl text-center">Browse through all the articles</h2>
      <label htmlFor="search" className="mt-6">Search any article!</label>
      <input className="w-72 sm:w-80 focus:outline-none bg-marron text-blanc bg-opacity-60 p-1 shadow-xl rounded-lg" type="text" value={search} onChange={handleChange} />
      <div className='container-articles'>
        {loading ? <p>Loading...</p> : allArticles()}
      </div>
      {userToken === '0' && needLogin()}
    </div>
  );
}
