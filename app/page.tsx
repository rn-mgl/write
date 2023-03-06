import landing from "../public/writeLanding.png";
import Image from "next/image";
import LinkComp from "@/src/components/input/Link";

export default function Landing() {
  return (
    <main
      className="p-5 cstm-flex-col justify-start gap-5 overflow-hidden text-wht
                t:cstm-flex-row
                l-s:p-10"
    >
      <div className="w-full h-3/6 cstm-flex-col text-center gap-2 t:items-start t:text-left l-s:text-left l-s:w-7/12 ">
        <p
          className=" font-noto font-extrabold text-3xl
                    m-l:text-4xl
                    l-s:text-6xl
                    l-l:text-7xl"
        >
          Hold your ideas, <br /> or make us do it.
        </p>
        <p
          className="font-work text-xs
                    m-l:text-sm
                    l-s:text-base
                    l-l:text-lg"
        >
          Write is a secure and private note-taking site to release all your{" "}
          <br className="hidden l-l:block" /> thoughts and free up your mind.
        </p>
        <div className="cstm-flex-col w-full gap-2 m-l:w-10/12 t:w-8/12 l-s:cstm-flex-row text-center l-l:w-6/12">
          <LinkComp label="Sign Up" link="signup" style="border-2 border-wht w-full" />
          <LinkComp
            label="Log In"
            link="login"
            style="border-2 border-wht bg-wht w-full text-blk2"
          />
        </div>
      </div>
      <div className="w-full h-2/6 cstm-flex-col l-s:w-5/12">
        <Image priority src={landing} alt="landing" className="w-full m-l:w-10/12 l-l:w-8/12" />
      </div>
    </main>
  );
}
