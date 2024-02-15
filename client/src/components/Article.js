import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

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

        content = content.replace(/\./g, '. <br> <br>');

        return (
          <div className='relative flex flex-col justify-center'>
            <img className=' py-4 w-96 sm:w-2/4 max-w-4xl m-auto' src={'http://localhost:8000/'+thumbnailURL} alt={title} />
            <h3 className='font-bold text-xl uppercase text-center p-4'>{title}</h3>
            <p className='text-md text-justify mx-4 sm:mx-48' dangerouslySetInnerHTML={{__html: content}}></p>
          </div>
        )
      }

      if (loading) {
        return <p>Loading...</p>;
      }

    return (
        <div className='mt-28 mb-8 bg-blanc'>
          <div className='flex flex-col mx-2 sm:mx-16 gap-2'>
            <NavLink to='/browse' className='-ml-1 w-24'>
            <ArrowLeft size={48} className='text-marron' />
            </NavLink>
            <h2 className='text-marron text-4xl font-bold'>Article</h2>
          </div>
            {data && showArticles(data.title, data.content, data.thumbnailURL, data.mediaURL, data.mediaType, data.id)}
        </div>
    )
}