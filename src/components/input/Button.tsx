import { FC, ReactElement } from "react";

interface ButtonProps {
  label: string;
  style: string;
  type: "button" | "submit";
  onClick?: () => void;
}

const ButtonComp: FC<ButtonProps> = (props): ReactElement => {
  return (
    <button
      type={props.type}
      className={`${props.style} p-2 rounded-md font-noto font-bold l-l:text-lg`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default ButtonComp;
