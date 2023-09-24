import React, { useState } from "react";
import axios from 'axios'


function Register() {
  const initialValue = {
    username: "",
    email: "",
    password: "",
  };

  const [signUp, setSignUp] = useState(true);
  const [authData, setAuthData] = useState(initialValue);

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  console.log(authData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(signUp) {
          const response = await axios.post("http://localhost:3014/api/register",authData);
        window.location = '/'         
      } else {
        const response = await axios.post("http://localhost:3014/api/login", authData, { withCredentials: true });        
        console.log('res', response.data);
        window.location = '/'
      } 
    } catch (error) {
      console.log(error);
    }
    setAuthData(initialValue);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 left-0 bottom-0">
      <div className="w-1/3 bg-white p-3">
        <h1 className="text-2xl text-indigo-600 uppercase font-bold">
          {signUp ? "register" : "login"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3 my-5">
            {signUp && (
              <input
                value={authData.username}
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="input-style"
              />
            )}
            <input
              value={authData.email}
              name="email"
              onChange={handleChange}
              type="text"
              placeholder="Email"
              className="input-style"
            />
            <input
              value={authData.password}
              name="password"
              onChange={handleChange}
              type="text"
              placeholder="Password"
              className="input-style"
            />
          </div>

          <div className="text-red-600 text-xs cursor-pointer mb-4">
            {signUp ? (
              <span onClick={() => setSignUp(false)}>
                Have you logged in before?
              </span>
            ) : (
              <span onClick={() => setSignUp(true)}>Click to register</span>
            )}
          </div>
          <button
            type="submit"
            className="text-white cursor-pointer bg-indigo-500 hover:bg-indigo-800 w-full text-center p-2 capitalize "
          >
            {signUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
