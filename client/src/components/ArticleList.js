import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import { useParams, NavLink } from 'react-router-dom';

export default function ArticleList() {
    const [articles, ShowArticles] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/articles")
            .then(res => ShowArticles(res.data))
            .catch(err => console.log(err))
    }, [])

  return (
    <div>
      articles
      <div>
            {articles.map((article, i) => {
              return <NavLink to={`/article/` + article.id}>{article.title}</NavLink>;
            })}
        </div>
    </div>
  )
}
