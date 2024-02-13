import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <>
      <div className="bg-blanc text-noir py-4 px-4  sm:px-0 border-b-2 border-noir items-center sticky top-0 left-0 right-0 z-10">
        <div className="hidden container bg-blanc mx-auto md:flex justify-around align-middle items-center">
          <Link to="/" className="text-3xl font-archivo">
            ECONIMAL
          </Link>
          <ul className="flex text-noir lg:gap-12 font-alata items-center">
            <li className="mr-6">
              <NavLink
                to="/comingsoon"
                className="text-noir hover:underline"
              >
                Educate
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/sneakers"
                className="text-noir hover:underline"
              >
                Innovations
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/promotions"
                className="text-noir hover:underline"
              >
                Discover
              </NavLink>
            </li>
            <li className="mr-6">
              <NavLink
                to="/trending"
                className="text-noir hover:underline"
              >
                Browse
              </NavLink>
            </li>
          </ul>
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
            } fixed top-0 right-0 h-full font-alata bg-blanc text-noir w-3/5 max-w-xs flex flex-col justify-center items-center p-6 gap-4 transition-transform duration-200 border-l-2 border-noir`}
          >
            <button
              className="absolute top-5 right-5 text-3xl font-bold"
              onClick={toggleMenu}
            >
              <X />
            </button>

            <NavLink
              to="/comingsoon"
              className="text-noir hover:underline"
              onClick={closeMenuOnClick}
            >
              Coming soon
            </NavLink>
            <hr className="w-3/5 bg-noir block h-0.5" />
            <NavLink
              to="/sneakers"
              className="text-noir hover:underline"
              onClick={closeMenuOnClick}
            >
              Sneakers
            </NavLink>
            <hr className="w-3/5 bg-noir block h-0.5" />
            <NavLink
              to="/promotions"
              className="text-noir hover:underline"
              onClick={closeMenuOnClick}
            >
              Promotions
            </NavLink>
            <hr className="w-3/5 bg-noir block h-0.5" />
            <NavLink
              to="/trending"
              className="text-noir hover:underline"
              onClick={closeMenuOnClick}
            >
              Trending
            </NavLink>        
          </div>
        </div>
      </div>
    </>
  );
}