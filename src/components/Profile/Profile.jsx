import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext }  from '../../Context/UserContext'

const Profile = () => {
  const [editToggle, setEditToggle] = useState(false);
  const [toogleText, setToggleText] = useState("Edit");
  const [isLoading, setIsLoading] = useState(false)
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth"))
  const [userName, setUserName] = useState('');

  const getUser = async ()=> {
    try {
      setIsLoading(true)
      const data = await fetch(`https://authsystemserver.onrender.com/profile/${auth.uid}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': auth.authToken
        }
      })
      const response = await data.json();
      setUser(response)
      setIsLoading(false)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=> {
    getUser();
  }, [toogleText])

  const handleEditToggle = async () => {
    setEditToggle((prev) => !prev);
    if (toogleText === "Edit") setToggleText("Save");
    if (toogleText === "Save") {
      try {
        const data = await fetch(`https://authsystemserver.onrender.com/profile/${auth.uid}`, {
          method: 'PUT',
          body: JSON.stringify({ username: userName }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': auth.authToken
          }
        })
      } catch (err) {
        console.error(err);
      }
      setToggleText("Edit");
    }
  };

  // Logout
  const handleLogout = ()=> {
    localStorage.clear();
    navigate('/login');
  }

  // Account Delete
  const handleDeleteAcc = async ()=> {
    try {
      const data = await fetch(`https://authsystemserver.onrender.com/profile/${auth.uid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth.authToken
        }
      })
      navigate('/signup');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-3/4 py-10 rounded-lg border-2 border-zinc-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
          <figure className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-person-fill text-white dark:text-indigo-300"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg>
            <figcaption className="sr-only">
              {userName}, Web Developer
            </figcaption>
          </figure>
          {editToggle ? (
            <div>
              <input
                type="text"
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-1 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                placeholder="Your name"
                autoFocus
                onChange={(e) =>
                  setUserName(e.target.value)
                }
                value={userName}
              />
            </div>
          ) : (
              isLoading ?
              <div className="text-xl"> Loading...</div>
              :
              <h2 className="mt-8 mb-1 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {user.username}
              </h2>
          )}
          <button
            className="px-5 py-1 mb-4 mt-2 bg-green-600 rounded-lg"
            onClick={handleEditToggle}
          >
            {toogleText}
          </button>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {user.email}
          </p>
          <div className="mt-8 sm:px-20 flex items-center justify-between sm:flex-row flex-col-reverse gap-4">
            <button onClick={handleDeleteAcc} className="inline-flex items-center px-4 py-2 bg-zinc-800 transition ease-in-out delay-75 hover:bg-zinc-900 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
              Delete account
            </button>

            <button onClick={handleLogout} className="group flex items-center justify-start w-10 h-10 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
              <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
