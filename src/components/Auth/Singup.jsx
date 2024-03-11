import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { useState } from 'react';

const Singup = () => {
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
    const [isLoader, setIsLoader] = useState(false);
    const [isEmailError, setIsEmailError] = useState('');
    const [isPasswordError, setIsPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e)=> {
      e.preventDefault();
      
      if( userData.username === '' || userData.email === '' || userData.password === '') return setIsError('fill all the fields');

      setIsLoader(true);
      try {
        const data = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json' },
          body: JSON.stringify(userData)
        });
        const response = await data.json();
        if(!response.authToken) { 
          setIsLoader(false)
          if(response.email) return setIsEmailError(response.email);
          if(response.password) return setIsPasswordError(response.password);
          
        } else {
          localStorage.setItem("auth", JSON.stringify(response));
          setIsLoader(false);
          navigate('/profile')
        }
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
          <form className="flex flex-col" >
            <input
              type="text"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Your name"
              autoFocus
              onChange={(e)=> setUserData({...userData, username: e.target.value})}
              value={userData.username}
            />
            <input
              type="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
              onChange={(e)=> setUserData({...userData, email: e.target.value})}
              value={userData.email}
            />
            {
              isEmailError && <p className='text-red-600' >{isEmailError}</p>
            }
            <input
              type="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
              onChange={(e)=> setUserData({...userData, password: e.target.value})}
              value={userData.password}
            />
            {
              isPasswordError && <p className='text-red-600' >{isPasswordError}</p>
            }
            <div className="flex items-center justify-between flex-wrap">
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-900 cursor-pointer"
              >
                <input type="checkbox" id="remember-me" className="mr-2" />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mb-0.5"
              >
                Forgot password?
              </a>
              <p className="text-gray-900 mt-4">
                {" "}
                Don't have an account?{" "}
                <Link
                  to='/login'
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                >
                  login
                </Link>
              </p>
            </div>
            {
              isLoader ?
              <div className="cursor-not-allowed bg-gradient-to-r from-zinc-600 to-zinc-600 text-white font-bold py-2 px-4 rounded-md mt-4" >
                  <Loader />
              </div> 
              :
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default Singup
