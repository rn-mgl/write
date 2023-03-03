"use client";
import React from "react";
import logo from "../../../public/writeLogoWhite.png";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

export const Logo = (): ReactElement => {
  const [path, setPath] = React.useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    setPath(token ? "write" : "");
  }, [path]);

  return (
    <Link href={path}>
      <Image
        src={logo}
        priority={true}
        alt="logo"
        className="absolute top-5 left-2/4 -translate-x-2/4 w-24 t:left-5 t:translate-x-0 l-s:left-10 l-s:top-10"
      />
    </Link>
  );
};
