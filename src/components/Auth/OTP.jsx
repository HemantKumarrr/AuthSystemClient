import { useState } from "react";
import "../../styles/otp.css";
import { useLocation, useNavigate } from 'react-router-dom'

const OTP = () => {
  const [otpData, setOtpData] = useState('');
  const [isError, setIsError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (otpData === "" )
      return setIsError("please enter 6 digit OTP");
    // setIsLoader(true);
    try {
      const data = await fetch("https://authsystemserver.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({email, password, otp: otpData }),
        headers: { "Content-Type": "application/json" },
      });
      let response = await data.json();
      if (!response.authToken) {
        setIsError(response.message);
        // setIsLoader(false);
      } else {
        localStorage.setItem("auth", JSON.stringify(response));
        navigate("/profile");
      }
    } catch (err) {
      console.error(err);
    }
    // setIsLoader(false);
  };

  return (
    <>
      <section className="w-2/3 m-auto mt-32">
        <div className=" rounded-md bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">OTP</h2>
              </div>
            </div>
            <form>
              
              <div className="mt-4 space-y-6">
                
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    OTP sent on this email{" " + " "+ email.slice(0,4) +"****" + "@gmail.com" } 
                  </label>
                  {
                    isError &&
                    <div className="text-red-700 p-1 px-4 mb-2 bg-red-300 rounded-md">
                      {isError}
                    </div>
                  }
                  <input
                    autoFocus
                    type="text"
                    placeholder="Enter code"
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    onChange={(e)=> setOtpData(e.target.value)}
                    value={otpData}
                  />
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    onClick={handleLogin}
                  >
                    {" "}
                    Submit {" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default OTP;
