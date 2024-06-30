"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      console.log("Response from BACKEND: ", response.data);
      alert("login success.");
    } catch (error) {
      alert("Invalid Credentials.");
    }
  };
  return (
    <div className="bg-zinc-900 w-full h-screen">
      <section className="text-gray-600 body-font relative flex w-full ">
        <div className="container px-5 py-24 flex justify-center w-full mx-auto">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <form onSubmit={handleSubmit}>
              <h2 className="text-gray-900 text-center text-xl mb-3 font-medium title-font">
                Login
              </h2>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                type="submit"
                className="text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Login
              </button>
              <p className="mt-5 text-black">
                not a user?{" "}
                <Link href={"/auth/register"} className="text-blue-600">
                  create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
