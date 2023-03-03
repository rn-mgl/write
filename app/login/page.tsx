"use client";
import LoginForm from "@/src/components/login/LoginForm";
import React from "react";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginData, setLoginData] = React.useState({
    candidateEmail: "",
    candidatePassword: "",
  });

  const { url } = useGlobalContext();
  const router = useRouter();

  const handleLoginData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = e.target;

    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    try {
      const req = await fetch(`${url}/auth/l`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const res = await req.json();

      localStorage.setItem("write_name", res?.name);
      localStorage.setItem("write_verified", res?.isVerified);
      localStorage.setItem("write_id", res?.userId);
      localStorage.setItem("write_token", `Bearer ${res?.token}`);
      localStorage.setItem("write_email", res?.email);

      router.push("/write");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cstm-flex-col min-h-screen p-5 gap-2">
      <p className="font-noto font-extrabold text-3xl mb-3 cstm-grdtxt-wht-1-2">Log In</p>
      <LoginForm onChange={handleLoginData} onSubmit={submitLogin} value={loginData} />
    </div>
  );
}
