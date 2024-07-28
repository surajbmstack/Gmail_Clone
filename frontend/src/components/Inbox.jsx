import React, { useState } from "react";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {
  MdCropSquare,
  MdInbox,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Emails from "./Emails";
const MailType = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Primary",
  },
  {
    icon: <GoTag size={"20px"} />,
    text: "Promotion",
  },
  {
    icon: <FaUserFriends size={"20px"} />,
    text: "Social",
  },
];
const Inbox = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20px"} />
            <FaCaretDown size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={"24px"} />
          <MdKeyboardArrowRight size={"24px"} />
        </div>
      </div>
      <div className="h-90vh overflow-y-auto">
        <div className="flex items-center gap-1">
          {MailType.map((item, index) => {
            return (
              <button
                onClick={() => setSelected(index)}
                className={`${
                  selected === index
                    ? "border-b-4 border-b-blue-600 text-blue-600 "
                    : "border-b-transparent"
                } flex items-center gap-5 p-4 w-52 hover:bg-gray-200`}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>
      <Emails />
    </div>
  );
};

export default Inbox;
