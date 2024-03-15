import { Link, useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader';
import { useState } from "react";

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' });
    const [isLoader, setIsLoader] = useState(false);
    const [isError, setIsError] = useState('');
    const navigate = useNavigate();

    const handleLoginOTP = async (e)=> {
      e.preventDefault();
      if( userData.email === '' || userData.password === '') return setIsError("fill all fileds")
      
      setIsLoader(true);
      try {
        const data = await fetch('http://localhost:5000/sendotp', {
          method: 'POST',
          body: JSON.stringify({email: userData.email}),
          headers: { 'Content-Type': 'application/json'}
        })
        let response = await data.json();
        if(!response.message) {
          setIsError(response.error);
          setIsLoader(false);
        } else { 
          navigate('/login/otp', { state: userData })
        }
      } catch (err) {
        console.error(err)
      }
      setIsLoader(false);
    }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
          <form className="flex flex-col">
            {
              isError && <p className='text-black mb-4 px-2 py-1 rounded-md bg-red-400 border-2 border-red-600' >{isError}</p>
            }
            <input
              type="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
              autoFocus
              onChange={(e)=> setUserData({...userData, email: e.target.value})}
              value={userData.email}
            />
            <input
              type="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
              onChange={(e)=> setUserData({...userData, password: e.target.value})}
              value={userData.password}
            />
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
                  to='/signup'
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                >
                  sign up
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
                onClick={handleLoginOTP}
              >
                Login
              </button>
            }
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
