import { useState, useEffect } from "react";
import axios from "axios";
import useCookie from "react-use-cookie";

export default function Userpage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setUserToken] = useCookie("token", "0");
  const [name, setName] = useState("");

  async function changeUsername() {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/updateUsername/",
        {
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    console.log(token);
    getUser();
  }, []);

  return (
    <div className="search min-h-screen flex text-xl  flex-col mt-28 m-auto items-center">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <div className="text-center flex flex-col justify-center items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="avatar"
            className="w-20 h-20 rounded-full"
          />
          <h1 className="mb-4">Hey {user.name}!</h1>
          <p>Your mail is: {user.email}</p>

          <hr className="w-[50%] m-auto mt-8 mb-4 bg-noir block h-0.5 opacity-40" />

          <form onSubmit={changeUsername} className="flex flex-col gap-4">
            <label htmlFor="name" className="flex flex-col gap-2 text-xl text-marron">Change your username:
            <input
              type="text"
              value={name}
              className="p-2 rounded-lg bg-vert bg-opacity-60 focus:outline-none text-noir"
              onChange={(e) => setName(e.target.value)}
              required
            />
            </label>
            <button className="bg-vert p-2 text-blanc" type="submit">Update!</button>
            </form>

            <hr className="w-[50%] m-auto mt-8 mb-4 bg-noir block h-0.5 opacity-40" />

            <h1 className="mb-4">More to come!</h1>
        </div>
      )}
    </div>
  );
}
