"use client";
import React from "react";
import logo from "../../../public/writeLogoWhite.png";
import Image from "next/image";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { ReactElement } from "react";

export const Logo = (): ReactElement => {
  const [path, setPath] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    setPath(token ? "write" : "");
  }, [setPath]);

  return (
    <div className="absolute w-full cstm-flex-row pt-5 px-5 t:p-0 t:pt-10 t:px-10">
      <Link href={path} className="mr-auto">
        <Image src={logo} priority={true} alt="logo" className="w-24" />
      </Link>
    </div>
  );
};
