"use client";
import SignupForm from "@/src/components/signup/SignupForm";
import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "context";

export default function SignUp() {
  const [signupData, setSignupData] = React.useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { url } = useGlobalContext();

  const handleSignupData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = e.target;

    setSignupData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();

    try {
      const req = await fetch(`${url}/auth/s`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const res = await req.json();

      localStorage.setItem("write_name", res?.name);
      localStorage.setItem("write_verified", res?.isVerified);
      localStorage.setItem("write_token", res?.token);
      localStorage.setItem("write_email", res?.email);
      localStorage.setItem("write_id", res?.userId);

      router.push("auth/register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cstm-flex-col min-h-screen p-5 gap-2">
      <p className="font-noto font-extrabold text-3xl mb-3 cstm-grdtxt-wht-1-2">Sign Up</p>
      <SignupForm onChange={handleSignupData} onSubmit={submitSignup} value={signupData} />
    </div>
  );
}
