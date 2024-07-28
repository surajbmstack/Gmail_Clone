import React, { useEffect, useState } from "react";
import Email from "./Email";
import usegetAllEmails from "../hooks/useGetAllEmails";
import { useSelector } from "react-redux";
const Emails = () => {
  usegetAllEmails();
  const { emails, searchText } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState(emails);
  useEffect(() => {
    const filteredEmail = emails.filter((emails) => {
      return (
        emails.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        emails.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilterEmail(filteredEmail);
  }, [searchText, emails]);
  return (
    <div>
      {filterEmail &&
        filterEmail?.map((email) => <Email key={email._id} email={email} />)}
      <Email />
    </div>
  );
};

export default Emails;
