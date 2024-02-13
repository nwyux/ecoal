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

   // const filteredArticles = articles.filter(article => {
    //  return article.article_tag.some(tag => tag.name === "react");
 // });
  
    return (
        <div>
            <h2>Educate</h2>
            <div>
                {articles.map((article, i) => (
                    <NavLink key={article.id} to={`/article/${article.id}`}>
                        {article.title}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
