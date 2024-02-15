import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

export default function Dashboard() {
  const [name, setTagName] = useState("");

  async function handleTag() {
    axios.post("http://127.0.0.1:8000/api/tag/create", {
      name: name,
    });

    console.log(name);
  }

  const [title, setTitle] = useState("");
  const [type, setmediaType] = useState("");
  const [content, setContent] = useState("");
  const [tURL, setThumbnailUrl] = useState("");
  const [cURL, setContentUrl] = useState("");
  const [leadStory, setLeadStory] = useState(false);

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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/article",
        formArticle
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/articles")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));

    axios
      .get("http://127.0.0.1:8000/api/tags")
      .then((response) => setTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  async function handleLinking(e) {
    e.preventDefault();
    axios.get(
      "http://127.0.0.1:8000/api/link/article/" +
        selectedArticle +
        "/tag/" +
        selectedTag
    );
  }

  return (
    <>
        <div className="sm:loginBg overflow-hidden flex relative justify-center items-center">
      <div className="flex flex-col items-center mb-6 mt-28 sm:bg-transparent sm:border-2 sm:border-blanc sm:rounded-lg max-w-xl px-36 m-auto sm:backdrop-blur-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-marron text-4xl mt-4 sm:text-blanc">Dashboard</h1>
        </div>

        <div className="flex flex-col mt-4">
          <h1 className="text-2xl font-bold text-center text-marron sm:text-blanc">Add an article</h1>
          <form
            onSubmit={handleArticle}
            className="flex flex-col gap-4 text-left"
          >
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
              <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                1
              </p>
              Title
              <input
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
            <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                2
              </p>
              Thumbnail
              <input
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                type="file"
                onChange={(e) => setThumbnailUrl(e.target.files[0])}
              />
            </label>
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
            <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                3
              </p>
              Content type
              <select
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                value={type}
                onChange={(e) => setmediaType(e.target.value)}
              >
                <option value="image">image</option>
                <option value="audio">audio</option>
                <option value="video">video</option>
              </select>
            </label>
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
            <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                4
              </p>
              Content
              <textarea
                rows="4"
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
            <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                5
              </p>
              Content media
              <input
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                type="file"
                onChange={(e) => setContentUrl(e.target.files[0])}
              />
            </label>
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
            <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                6
              </p>
              Trending story?
              <select
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                value={leadStory}
                onChange={(e) => setLeadStory(e.target.value)}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
            <input
              className="w-72 sm:w-80 m-auto focus:outline-none bg-vertfonce text-blanc p-1 shadow-xl rounded-lg"
              type="submit"
              value="Submit"
            />
          </form>

          <hr className="w-[50%] m-auto mt-8 bg-noir block h-0.5 opacity-40" />
          
            <div className="flex flex-col items-center mt-4">
                <h1 className="text-xl text-center text-marron sm:text-blanc">Add a tag</h1>
                <form onSubmit={handleTag} className="flex flex-col gap-4 text-left">
                <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
                <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                        1
                    </p>
                        Tag
                        <input className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg" type="text" value={name} onChange={(e) => setTagName(e.target.value)}></input>
                    </label>
                    <input
              className="w-72 sm:w-80 m-auto focus:outline-none bg-vertfonce text-blanc p-1 shadow-xl rounded-lg"
              type="submit"
              value="Submit"
            />
                </form>
            </div>

            <hr className="w-[50%] m-auto mt-8 bg-noir block h-0.5 opacity-40" />

        <div className="flex flex-col items-center mt-4">
          <h1 className="text-xl text-center text-marron sm:text-blanc">Link an article to a tag</h1>
          <form onSubmit={handleLinking} className="flex flex-col gap-4 text-left">
          <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
          <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                1
              </p>
              Select an article :
              <select
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                value={selectedArticle}
                onChange={(e) => setSelectedArticle(e.target.value)}
              >
                {articles.map((article) => (
                  <option key={article.id} value={article.id}>
                    {article.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex relative flex-col max-w-xl p-2 m-auto text-vertfonce sm:text-blanc sm:text-xl">
            <p className="absolute -left-6 text-vertfonce sm:-left-10 sm:py-1 sm:px-3 sm:text-xl font-bold bg-vert px-2 rounded-full">
                2
              </p>
              Select a tag :
              <select
                className="w-72 sm:w-80 focus:outline-none bg-[rgb(172,185,146)] bg-opacity-60 p-1 shadow-xl rounded-lg"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </label>
            <input
              className="w-72 sm:w-80 m-auto mb-8 focus:outline-none bg-vertfonce text-blanc p-1 shadow-xl rounded-lg"
              type="submit"
              value="Link"
            />
          </form>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}
