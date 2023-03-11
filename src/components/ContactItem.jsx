import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const ContactItem = ({ item, handleToggleFavorite }) => {
  return (
    <div className="flex p-3 gap-2 border-2 justify-between text-xl group max-w-[800px] min-w-[500px] transition hover:scale-105  ">
      <h3 className="flex w-1/2 items-center gap-2">
        <span className="text-sm" onClick={() => handleToggleFavorite(item.id)}>
          {item.favorite ? <AiTwotoneStar /> : <AiOutlineStar />}
        </span>
        <FaUserCircle />
        <span className="">{item.name}</span>
      </h3>
      <p>{item.phoneNumber}</p>
      <Link
        className="text-lg text-white group-hover:text-black hover:underline"
        to={`/Contact/${item.id}`}
      >
        INFO
      </Link>
    </div>
  );
};

export default ContactItem;
