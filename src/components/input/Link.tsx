import React, { ReactElement } from "react";
import Link from "next/link";

interface LinkProps {
  link: string;
  style: string;
  label: string;
}

const LinkComp: React.FC<LinkProps> = (props): ReactElement => {
  return (
    <Link
      className={`${props.style} cursor-pointer p-2 rounded-md font-noto font-bold l-l:text-lg text-center  `}
      href={props.link}
    >
      {props.label}
    </Link>
  );
};

export default LinkComp;
