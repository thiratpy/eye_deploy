import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    'https://eggaokvibnheenenongc.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZ2Fva3ZpYm5oZWVuZW5vbmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0MzIwNjEsImV4cCI6MjA0NTAwODA2MX0.FunJBC2X_9yxcyF7ZYMij7yphMhcBD9hjI6TjNRoGxk'
  );

function NavigationTab() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userRole = localStorage.getItem("user_role");
      const userEmail = localStorage.getItem("user_email");
  
      if (userRole && userEmail) {
        try {
          const { data, error } = await supabase
            .from("user")
            .select("name, surname")
            .eq("roles", userRole)
            .eq("email", userEmail)
            .single();
  
          if (error) {
            console.error("Error fetching user data:", error);
            // If there's an error fetching user data, clear the potentially invalid credentials:
            localStorage.removeItem("user_role");
            localStorage.removeItem("user_email");
          } else {
            setUser(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // If there's an error fetching user data, clear the potentially invalid credentials:
          localStorage.removeItem("user_role");
          localStorage.removeItem("user_email");
        }
      }
    };
  
    fetchUserData();
  }, []);

  const handleUserDataClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const toggleMenu = () => {  // Here's the toggleMenu function
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-amber-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5211/5211539.png"
              alt="Logo"
              className="h-14 mx-auto object-cover rounded-full truncate cursor-pointer border border-amber-600"
            />
          </Link>
        </div>

        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`absolute top-20 right-0 w-48 shadow-lg rounded-lg ${
            isOpen ? "block" : "hidden"
          } md:relative md:top-0 md:right-0 md:w-auto md:shadow-none md:bg-transparent md:flex md:items-center md:justify-end`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <div
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition-transform transform  hover:shadow-lg cursor-pointer flex items-center relative"
                onClick={handleUserDataClick}
              >
                {user ? (
                  <>
                    {/* <img
                      src="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-user-icon-image_1187018.jpg"
                      alt="User"
                      className="h-6 w-6 mr-2"
                    /> */}
                    {/* Show user name and role when authenticated */}
                    <span className="hidden md:block">
                      {user.name} {user.surname} ({localStorage.getItem("user_role")})
                    </span>
                    <div
                      className={`absolute top-10 right-0 w-48 bg-white shadow-lg rounded-lg ${
                        isOpen ? "block" : "hidden"
                      }`}
                    >
                      <ul className="py-1">
                        <li>
                          <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            {user.name} {user.surname} ({localStorage.getItem("user_role")})
                          </span>
                        </li>
                        <li>
                          <button
                            className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  "Login"
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationTab;