import React from "react";

export default function verify() {
  return (
    <div className="cstm-grdbg-blk-1-2 h-auto min-h-screen cstm-flex-col p-5 gap-5">
      <div className="cstm-flex-col gap-2">
        <p
          className="font-noto text-wht font-bold text-center
                    t:text-lg
                    l-s:text-xl"
        >
          account verification is being sent to your email
        </p>

        <p
          className="font-work text-wht font-light text-sm text-center
                  t:base"
        >
          you can close this page if you have received the email
        </p>
      </div>

      <div className="bg-red-300 w-6 h-8 animate-loading shadow-gry2 shadow-sm p-1 cstm-flex-col gap-[2px]">
        <div className="w-full bg-wht h-[1px] opacity-30" />
        <div className="w-full bg-wht h-[1px] opacity-30" />
        <div className="w-full bg-wht h-[1px] opacity-30" />
        <div className="w-full bg-wht h-[1px] opacity-30" />
      </div>
    </div>
  );
}
