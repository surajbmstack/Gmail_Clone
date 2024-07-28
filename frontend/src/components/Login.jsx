import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/appSlice";
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col gap-3 w-[20%]"
      >
        <h1 className="font-bold text-2xl uppercase my-2 ">Login</h1>
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Email"
          value={input.email}
          name="email"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Password"
          value={input.password}
          name="password"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <button
          type="submit"
          className="bg-gray-800 p-2 text-white my-2 rounded-md"
        >
          Login
        </button>

        <p>
          Dont have an account?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
