"use client";
import React from "react";
import logo from "../../../public/writeLogoWhite.png";
import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { ReactElement } from "react";

export const Logo = (): ReactElement => {
  const [path, setPath] = React.useState("");

  const logOut = () => {
    localStorage.clear();
    setPath("");
  };

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    setPath(token ? "write" : "");
  }, [setPath]);

  return (
    <div className="w-full cstm-flex-row p-5 t:p-10">
      <Link href={path} className="mr-auto">
        <Image src={logo} priority={true} alt="logo" className="w-24 mr-auto" />
      </Link>

      {path === "write" ? (
        <Link
          onClick={logOut}
          className="p-2 hover:bg-gry1 hover:text-blk2 text-wht rounded-full"
          href="/"
        >
          <BiLogOut className="scale-125 " />
        </Link>
      ) : null}
    </div>
  );
};
