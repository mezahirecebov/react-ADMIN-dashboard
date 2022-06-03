import React, { useState } from "react";
import { users } from "../data/users";
import { useStateContext } from "../contexts/ContextProvider";

import { LockClosedIcon } from "@heroicons/react/solid";
import admin from "../data/admin.png";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // v6

import { signup } from "../authentication/authActions";

const SignUp = () => {
  const navigate = useNavigate();
  const { currentColor, isAuthenticated, setIsAuthenticated } =
    useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={admin} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              className="font-medium text-green-600 hover:text-green-500"
            >
              start your 14-day free trial
            </a>
          </p> */}
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={emailChangeHandler}
                value={email}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={passwordChangeHandler}
                value={password}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              /> */}
              {/* <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label> */}
            </div>

            {/* <div className="text-sm">
              <a
                href="#"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-green-500 group-hover:text-green-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
          <div>
            Already have an account?{" "}
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "text-blue-600"
              }
              to="/login"
            >
              Log In
            </NavLink>
          </div>
          {error && <p className="text-red-500">Error</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
