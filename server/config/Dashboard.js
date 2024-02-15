import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'

export default function Dashboard() {

    const [name, setTagName] = useState("")

    async function handleTag() {
        axios.post("http://127.0.0.1:8000/api/tag/create", {
            name: name
        })

        console.log(name);
    }



    const [title, setTitle] = useState("")
    const [type, setmediaType] = useState("")
    const [content, setContent] = useState("")
    const [tURL, setThumbnailUrl] = useState("")
    const [cURL, setContentUrl] = useState("")
    const [leadStory, setLeadStory] = useState(false)



    async function handleArticle(e) {
        e.preventDefault();
        let formArticle = new FormData();
        formArticle.append("title", title);
        formArticle.append("content", content);
        formArticle.append("mediaType", type);
        formArticle.append("thumbnailURL", tURL);
        formArticle.append("mediaURL", cURL);
        formArticle.append("leadStory", leadStory);


        try {
            const response = await axios.post("http://127.0.0.1:8000/api/article", formArticle);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/articles")
            .then(response => setArticles(response.data))
            .catch(error => console.error("Error fetching articles:", error));

        axios.get("http://127.0.0.1:8000/api/tags")
            .then(response => setTags(response.data))
            .catch(error => console.error("Error fetching tags:", error));
    }, []);

    async function handleLinking(e) {
        e.preventDefault();
        axios.get('http://127.0.0.1:8000/api/link/article/' + selectedArticle + '/tag/' + selectedTag)
    }



    return (
        <>
            <div className="flex flex-col items-center mt-36">
                <h1>Créer un tag</h1>
                <form onSubmit={handleTag}>
                    <label>
                        Tag :
                        <input type="text" value={name} onChange={(e) => setTagName(e.target.value)}></input>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                <br></br>

                <h1>Créer un article</h1>
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
                    <label>
                        leadStory:
                        <select value={leadStory} onChange={(e) => setLeadStory(e.target.value)}>
                            <option value="false">Non</option>
                            <option value="true">Oui</option>
                        </select>
                    </label>
                        <input type="submit" value="Submit" />
                </form>
                <br></br>
                <h1>Lier un tag avec un article</h1>
                <form onSubmit={handleLinking}>
                    <label>
                        Sélectionner un article :
                        <select value={selectedArticle} onChange={(e) => setSelectedArticle(e.target.value)}>
                            {articles.map(article => (
                                <option key={article.id} value={article.id}>{article.title}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Sélectionner un tag :
                        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                    </label>
                    <input type="submit" value="Lier" />
                </form>
            </div>
        </>



    )
}
