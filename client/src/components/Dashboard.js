import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Dashboard() {

    const [name, setTagName] = useState("")

    async function handleTag() {
        axios.post("http://127.0.0.1:8000/api/tag/create", {
            name: name
        })
    }



    const [title, setTitle] = useState("")
    const [type, setmediaType] = useState("")
    const [content, setContent] = useState("")
    const [tURL, setThumbnailUrl] = useState("")
    const [cURL, setContentUrl] = useState("")
    const [leadStory, setLeadStory] = useState(0)



    async function handleArticle(e) {
        e.preventDefault();
        let formArticle = new FormData();
        formArticle.append("title", title);
        formArticle.append("content", content);
        formArticle.append("mediaType", type);
        formArticle.append("thumbnailURL", tURL);
        formArticle.append("mediaURL", cURL);
        formArticle.append("leadStory", leadStory);
        axios.post("http://127.0.0.1:8000/api/article", formArticle)
    }

    return (
        <>
            <form onSubmit={handleTag}>
                <label>
                    Tag :
                    <input type="text" value={name} onChange={(e) => setTagName(e.target.value)}></input>
                </label>
                <input type="submit" value="Submit" />
            </form>

            <form onSubmit={handleArticle}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Thumbnail:
                    <input type="file" onChange={(e) => setThumbnailUrl(e.target.files[0])} />
                </label>
                <label>
                    Content type:
                    <select value={type} onChange={(e) => setmediaType(e.target.value)}>
                        <option value="image">image</option>
                        <option value="audio">audio</option>
                        <option value="video">video</option>
                    </select>
                </label>
                <label>
                    Content:
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <label>
                    Content media:
                    <input type="file" onChange={(e) => setContentUrl(e.target.files[0])} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>



    )
}
