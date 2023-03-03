"use client";
import React from "react";
import Link from "next/link";

import { useGlobalContext } from "context";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";

const verifyUser = async (token: string, url: string) => {
  try {
    const req = await fetch(`${url}/auth/v/${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    const res = await req.json();
  } catch (error) {
    console.log(error);
  }
};

export default function verify() {
  const { url } = useGlobalContext();
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      verifyUser(token, url);
    } else {
      router.push("login");
    }
  }, []);

  return (
    <>
      <div className="min-h-screen cstm-flex-col p-5 gap-5">
        <div className="cstm-flex-col gap-2">
          <p
            className="font-noto text-wht font-bold text-center animate-dropOpacity
                    t:text-lg
                    l-s:text-xl"
          >
            congrats! you are now verified!
          </p>

          <Link
            href="login"
            className="font-work text-wht font-light text-sm cstm-flex-row gap-2 underline-offset-2 rounded-full transition-all
                  animate-dropOpacity 
                  hover:border-l-2 hover:border-b-2 hover:border-wht hover:p-2
                  t:base"
          >
            proceed to log in <BsArrowRight className="animate-sway" />
          </Link>
        </div>
      </div>
    </>
  );
}
