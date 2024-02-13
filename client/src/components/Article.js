import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Article() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getData() {
        setLoading(true);
        const response = (await axios.get('http://localhost:8000/api/article/'+id)).data;
        setData(response);
        setLoading(false);
      }
    
      useEffect(() => {
        getData();
      }, []);
    
      function showArticles(title, content, thumbnailURL, mediaURL, mediaType, id) {

        if (mediaType === "video") {
          mediaURL = mediaURL.replace("watch?v=", "embed/");
        } else if (mediaType === "audio") {
          mediaURL = mediaURL.replace("track", "embed/track");
        }

        function Audio(){
          if (mediaURL.includes("spotify")) {
          return (
            <iframe src={mediaURL}></iframe>
          )
        } else {
          return (
            <audio controls src={mediaURL}>
            </audio>
          )
        }
      }

        function Media() {
          if (mediaType === "video") {
            return (
              <div className='media'>
                <iframe src={mediaURL}></iframe>              
              </div>
            )
          } else if (mediaType === "image") {
            return (
              <div className='media'>
                <img src={mediaURL} alt={title} />
              </div>
            )
          } else if (mediaType === "audio"){
            return (
              <div className='media'>
              </div>
            )
          } 
        }

        content = content.replace(/\./g, '. <br> <br> <br>');

        return (
          <div className='article'>
            <h3>{title}</h3>
            <img src={'http://localhost:8000/'+thumbnailURL} alt={title} />
            <p dangerouslySetInnerHTML={{__html: content}}></p>
          </div>
        )
      }

      if (loading) {
        return <p>Loading...</p>;
      }

    return (
        <div>
            <h2>Article</h2>
            <div className='container-articles'>
            {data && showArticles(data.title, data.content, data.thumbnailURL, data.mediaURL, data.mediaType, data.id)}
            </div>
        </div>
    )
}