import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import { useParams } from 'react-router-dom';
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

  function showArticlesLogged(title, content, leadStory, thumbnailURL, id) {

    if (content == 1) {
    return (
      <div className=''>
        <h3>{title}</h3>
        <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
        <p className="articletext">{leadStory}</p>

        <div className="abovetext">
          <div className="blur"></div>
          <a className="readmore" href={"/article/" + id}>
            <p>Read more</p>
            <button className='readmorebutton'><i className='bx bx-down-arrow-alt' ></i></button>
          </a>
        </div>
      </div>
    )
    }; 
    
    if (id == '1') {
      return (
        <div className='flex bg-vert'>
          <h3>{title}</h3>
          <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
          <p className="articletext">{leadStory}</p>
  
          <div className="abovetext">
            <div className="blur"></div>
            <a className="readmore" href={"/article/" + id}>
              <p>Read more</p>
              <button className='readmorebutton'><i className='bx bx-down-arrow-alt' ></i></button>
            </a>
          </div>
        </div>
      )
    }
}

  function showArticlesNotLogged(title, thumbnailURL, leadStory, id) {

      return (
        <div className='flex flex-row-reverse max-w-lg'>
        <img src={'http://localhost:8000/'+thumbnailURL} alt={title} className='w-full'/>
        <h3>{title}</h3>
      </div>
      )
  }

  function needLogin() {
    if (userToken === '0'){
    return (
      <div className='gologin'>
        <div>
        <h3>Log in or register to read more</h3>
        <a href="/login/"><button className='loginbutton'>Log in</button></a>
        <a href="/register/"><button className='registerbutton'>Register</button></a>
        </div>
      </div>
    )
    }
  }


  function allArticles() {
    if (userToken === '0') {
      return (
        <div className='flex flex-wrap'>
          {data && data.map((article) => {
            return (
              <div className='flex bg-vert p-6 '>
                {showArticlesNotLogged(article.title, article.thumbnailURL, article.leadStory, article.id)}
                </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          {data && data.map((article) => {
            return (
              <div className='flex bg-vert'>
                {showArticlesLogged(article.title, article.leadStory, article.content, article.thumbnailURL, article.id)}
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
    <div className='container-articles mt-32 flex justify-center items-center'>
      {data && allArticles()}
      {needLogin()}
    </div>
  )
}