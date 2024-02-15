import React, { useEffect, useState } from "react";
import axios from "axios";
import useCookie from 'react-use-cookie';
import { NavLink, Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useCookie('token', '0');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = 'http://localhost:8000/api/articles/';

        if (selectedTag) {
          url += `tag/${selectedTag}`;
        }
        
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tags/');
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }

    fetchTags();
    fetchData();

  }, [selectedTag]);

  function showArticlesLogged(title, content, leadStory, thumbnailURL, id) {
    return (
      <SplideSlide key={id} className="w-full sm:max-w-none max-h-lg ">
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-4/6 sm:w-auto h-80 justify-center items-center border-2 border-marron bg-blanc rounded-xl overflow-hidden">
            <Link to={`/article/${id}`} className="sm:w-80">
              <img src={`http://localhost:8000/${thumbnailURL}`} alt={title} className="m-auto max-h-40" />
            </Link>

            <div className="flex flex-col justify-center items-center">
              <Link to={`/article/${id}`} className="sm:w-80">
                <h1 className="text-sm text-center sm:text-xl font-bold hover:underline">
                  {title}
                </h1>
              </Link>
              <h2 className="text-md text-zinc-500 sm:text-lg">
                {leadStory === "1" ? "Featured" : "Regular"} article
              </h2>
            </div>

            <div className="flex justify-center items-center gap-2 py-2">
              <Link to={`/article/${id}`} className="bg-marron text-blanc py-2 px-2 sm:px-4 rounded-lg text-xs hover:bg-zinc-700">
                READ MORE
              </Link>
            </div>
          </div>
        </div>
      </SplideSlide>
    );
  }
  // to={`/article/${id}`}

  function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {
    return (
      <SplideSlide key={id} className="w-full sm:max-w-none max-h-lg ">
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-4/6 sm:w-auto h-80 justify-center items-center border-2 border-marron bg-blanc rounded-xl overflow-hidden">
            <Link to="/login" className="sm:w-80">
              <img src={`http://localhost:8000/${thumbnailURL}`} alt={title} className="m-auto max-h-40" />
            </Link>

            <div className="flex flex-col justify-center items-center">
              <Link to="/login" className="sm:w-80">
                <h1 className="text-sm text-center sm:text-xl font-bold hover:underline">
                  {title}
                </h1>
              </Link>
              <h2 className="text-md text-zinc-500 sm:text-lg">
                {leadStory === "1" ? "Featured" : "Regular"} article
              </h2>
            </div>

            <div className="flex justify-center items-center gap-2 py-2">
              <Link to="/login" className="bg-marron text-blanc py-2 px-2 sm:px-4 rounded-lg text-xs hover:bg-zinc-700">
                LOG IN TO READ MORE
              </Link>
            </div>
          </div>
        </div>
      </SplideSlide>
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
        <Splide
          className="w-[450px] flex items-center py-6 justify-center"
          options={{
            type: "loop",
            focus: "center",
            pagination: true,
            paginationKeyboard: true,
            paginationDirection: "ltr",
            perPage: 1,
            breakpoints: {
              1024: {
                perPage: 1,
              },
              1439: {
                perPage: 2,
              },
            },
          }}
        >
          {data && data.slice(0, 3).map((article) => (
            <SplideSlide key={article.id} className="w-full sm:max-w-none max-h-lg font-horizonbig">
              {userToken === '0'
                ? showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id)
                : showArticlesLogged(article.title, article.content, article.leadStory, article.thumbnailURL, article.id)
              }
            </SplideSlide>
          ))}
        </Splide>
      </div>
    );
  }
  

  return (
    <div className='loginBg overflow-hidden min-h-screen relative justify-center'>
        <h1 className='sm:text-7xl text-3xl mr-16 ml-6 mt-28 sm:mt-24 sm:mr-80 text-marron font-bold sm:max-w-4xl'><p className='text-blanc'>Econimal</p>the journal that will teach you more about what surrounds us</h1>
        
        <div className='flex flex-col items-center mt-16 min-h-96 justify-center backdrop-blur-sm'>
          <h1 className="text-3xl sm:text-6xl text-blanc mt-14 font-bold">
            Trending articles
          </h1>
          {loading ? <p>Loading...</p> : allArticles()}
        </div>
        <div className='flex flex-col items-center'>
          {userToken === '0' && needLogin()}
        </div>
      </div>
  )
}
