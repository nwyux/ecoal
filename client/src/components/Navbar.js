import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useCookie from "react-use-cookie";
import axios from "axios";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [token, setUserToken] = useCookie("token", "0");
  const [data, setData] = useState(null);

  console.log(token);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    const handleMouseDown = (event) => {
      closeMenu(event);
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [showMenu]);

  const closeMenuOnClick = () => {
    setShowMenu(false);
  };

  function isLogged() {
    if (token === "0") {
      return (
        <ul className="flex text-noir lg:gap-12 font-alata items-center">
          <li className="mr-6">
            <NavLink to="/login" className="text-noir hover:underline">
              Login
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/register" className="text-noir hover:underline">
              Register
            </NavLink>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex text-noir lg:gap-12 font-alata items-center">
          <li className="mr-6">
            <NavLink to="/user" className="text-noir hover:underline">
              User page
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink to="/logout" className="text-noir hover:underline">
              Logout
            </NavLink>
          </li>
        </ul>
      );
    }
  }

  function isLoggedMobile() {
    if (token === "0") {
      return (
        <>
          <NavLink
            to="/login"
            className="text-noir hover:underline text-xl"
            onClick={closeMenuOnClick}
          >
            Login
          </NavLink>
          <hr className="w-1/5 bg-noir block h-0.5 opacity-40" />
          <NavLink
            to="/register"
            className="text-noir hover:underline text-xl"
            onClick={closeMenuOnClick}
          >
            Register
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            to="/user"
            className="text-noir hover:underline text-xl"
            onClick={closeMenuOnClick}
          >
            User page
          </NavLink>
          <hr className="w-1/5 bg-noir block h-0.5 opacity-40" />
          <NavLink
            to="/logout"
            className="text-noir hover:underline text-xl"
            onClick={closeMenuOnClick}
          >
            Logout
          </NavLink>
        </>
      );
    }
  }

  return (
    <>
      <div className="bg-blanc z-50 text-noir py-4 px-4  sm:px-0 border-b-2 border-noir items-center sticky top-0 left-0 right-0">
        <div className="hidden container bg-blanc mx-auto md:flex justify-around align-middle items-center">
          <Link to="/" className="text-3xl font-archivo">
            ECONIMAL
          </Link>
          <ul className="flex text-noir lg:gap-12 font-alata items-center">
            <li className="mr-6">
              <NavLink to="/educate" className="text-noir hover:underline">
                Educate
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink to="/innovations" className="text-noir hover:underline">
                Innovations
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink to="/discover" className="text-noir hover:underline">
                Discover
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink to="/browse" className="text-noir hover:underline">
                Browse
              </NavLink>
            </li>
          </ul>
          {isLogged()}
        </div>

        <div className="container mx-auto md:hidden flex justify-between items-center relative">
          <div className="text-noir">
            <Link to="/" className="text-3xl font-archivo">
              ECONIMAL
            </Link>
          </div>
          <button className="text-3xl font-bold" onClick={toggleMenu}>
            {showMenu ? <X /> : <Menu />}
          </button>

          <div
            ref={menuRef}
            className={`${
              showMenu ? "translate-x-0" : "translate-x-full"
            } fixed top-0 right-0 h-full font-alata bg-blanc opacity-95 text-noir w-full max-w-lg flex flex-col justify-center items-center p-6 gap-4 transition-transform duration-200 border-l-2 border-noir`}
          >
            <button
              className="absolute top-5 right-5 text-3xl font-bold"
              onClick={toggleMenu}
            >
              <X />
            </button>

            <NavLink
              to="/educate"
              className="text-noir hover:underline text-xl"
              onClick={closeMenuOnClick}
            >
              Educate
            </NavLink>
            <hr className="w-1/5 bg-noir block h-0.5 opacity-40" />
            <NavLink
              to="/innovations"
              className="text-noir hover:underline text-xl"
              onClick={closeMenuOnClick}
            >
              Innovations
            </NavLink>
            <hr className="w-1/5 bg-noir block h-0.5 opacity-40" />
            <NavLink
              to="/discover"
              className="text-noir hover:underline text-xl"
              onClick={closeMenuOnClick}
            >
              Discover
            </NavLink>
            <hr className="w-1/5 bg-noir block h-0.5 opacity-40" />
            <NavLink
              to="/browse"
              className="text-noir hover:underline text-xl"
              onClick={closeMenuOnClick}
            >
              Browse
            </NavLink>
            <hr className="w-1/5 bg-noir block h-0.5 opacity-40" />
            {isLoggedMobile()}
          </div>
        </div>
      </div>
    </>
  );
}
