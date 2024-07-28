import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
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
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={submitHandler}
        action=""
        className="flex flex-col gap-3 w-[20%]"
      >
        <h1 className="font-bold text-2xl uppercase my-2 ">Signup</h1>
        <input
          onChange={changeHandler}
          type="text "
          value={input.fullname}
          name="fullname"
          placeholder="Name"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <input
          onChange={changeHandler}
          type="text"
          value={input.email}
          name="email"
          placeholder="Email"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <input
          onChange={changeHandler}
          type="text"
          value={input.password}
          name="password"
          placeholder="Password"
          className="border border-gray-400 rounded-md px-2 py-1"
        />
        <button
          type="submit"
          className="bg-gray-800 p-2 text-white my-2 rounded-md"
        >
          Signup
        </button>
        <p>
          Already have an account?{" "}
          <Link to={"/Login"} className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
