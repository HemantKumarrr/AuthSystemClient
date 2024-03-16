import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSentMail, setIsSentMail] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleForgotPass = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(
        "https://authsystemserver.onrender.com/login/forgot-password",
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await data.json();
      if (response.message === "Check your mail") return setIsSentMail(true);
      if (response.message === "no user found") return setIsError(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isSentMail ? (
        <section className="w-2/3 m-auto mt-32">
          <div className="text-center rounded-md bg-green-600 relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
            <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-0">
              <div className="flex flex-col">
                <div className="w-12 m-auto">
                    <img src="https://imgs.search.brave.com/s-l980vXMiCaLaiCDyEYrq_w5140cVd27LSLVqJMrwY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvNzA5LzcwOTUx/MC5wbmc" alt="tick-image" />
                </div>
                <div>
                  <h2 className="text-4xl text-white pt-4">Check Your Email</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-2/3 m-auto mt-32">
          <div className=" rounded-md bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
            <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
              <div className="flex flex-col">
                <div>
                  <h2 className="text-4xl text-black">Enter your email</h2>
                </div>
              </div>
              <form>
                <div className="mt-4 space-y-6">
                  <div className="col-span-full">
                    {isError && (
                      <div className="text-red-700 p-1 px-4 mb-2 bg-red-300 rounded-md">
                        {isError}
                      </div>
                    )}
                    <input
                      autoFocus
                      type="email"
                      placeholder="Enter your email"
                      className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <div className="col-span-full">
                    <button
                      type="submit"
                      className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                      onClick={handleForgotPass}
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
