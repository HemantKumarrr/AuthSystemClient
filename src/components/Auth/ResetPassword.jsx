import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassord, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if(passord !== confirmPassord) return setIsError("Password doesn't match")
    try {
        const data = await fetch('https://authsystemserver.onrender.com/reset-password', {
            method: 'POST',
            body: JSON.stringify(password),
            headers: {'Content-Type': 'application/json'}
        });
        const response = await data.json();
        if(response.message) return navigate('/login')
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <section className="w-2/3 m-auto mt-32">
        <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">Reset password</h2>
              </div>
            </div>
            <form>
              {isError && (
                <div className="text-red-700 p-1 px-4 mb-2 bg-red-300 rounded-md">
                  {isError}
                </div>
              )}
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    onChange={(e)=> setPassword(e.target.value)}
                    value={password}
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    {" "}
                    Confirm passord{" "}
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    value={confirmPassord}
                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    onClick={handleReset}
                  >
                    {" "}
                    Submit your request{" "}
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

export default ResetPassword;
