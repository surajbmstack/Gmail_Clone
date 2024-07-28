import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setEmails } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { open, emails } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/email/create",
        formData,
        {
          header: {
            "Content-Type": "aaplication/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setEmails([...emails, res.data.email]));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setOpen(false));
  };
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}
    >
      <div className="flex items-center justify-between px-3 py-2 bg-[#F2F6FC]">
        <h1>New message</h1>
        <div
          onClick={() => dispatch(setOpen(false))}
          className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"
        >
          <RxCross2 size={"20px"} />
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col p-3 gap-2"
        action=""
      >
        <input
          name="to"
          value={formData.to}
          onChange={changeHandler}
          type="text"
          placeholder="to"
          className="outline-none py-1"
          key="to"
        />
        <input
          name="subject"
          value={formData.subject}
          onChange={changeHandler}
          type="text"
          placeholder="subject"
          className="outline-none py-1"
          key="subject"
        />
        <textarea
          onChange={changeHandler}
          name="message"
          value={formData.message}
          rows={"10"}
          cols={"30"}
          className="outline-none py-1"
          key="message"
        />
        <button className="bg-blue-600 rounded-full px-2 py-1 w-fit">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendEmail;
