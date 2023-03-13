"use client";
import React from "react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";

const layout = ({ children }: { children: React.ReactNode }) => {
  const logOut = () => {
    localStorage.removeItem("write_name");
    localStorage.removeItem("write_verified");
    localStorage.removeItem("write_id");
    localStorage.removeItem("write_token");
    localStorage.removeItem("write_email");
  };

  return (
    <div>
      <Link
        onClick={logOut}
        className="absolute right-5 top-5 p-2 t:right-14 t:top-10 hover:bg-gry1  hover:text-blk2 text-wht rounded-full"
        href="/"
      >
        <BiLogOut className="scale-125 " />
      </Link>
      {children}
    </div>
  );
};

export default layout;
