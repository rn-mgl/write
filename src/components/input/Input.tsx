"use client";
import React from "react";

interface InputProps {
  name: string;
  placeholder: string;
  style?: string;
  value: string;
  label: string;
  required?: boolean;
  type?: "number" | "text" | "date" | "email" | "password";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComp: React.FC<InputProps> = (props): React.ReactElement => {
  return (
    <div className="w-full">
      <label className="font-work text-wht text-sm mr-auto" htmlFor={props.name}>
        {props.label}
      </label>
      <div className="w-full relative">
        <input
          name={props.name}
          placeholder={props.placeholder}
          id={props.name}
          className={`${props.style} p-2 font-work rounded-md w-full
                    transition-all ease-in-out duration-75
                     focus:outline-0 focus:border-blk2`}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          required={props.required}
          type={props.type || "text"}
        />

        {props.required ? (
          <div className="w-2 h-2 rounded-full bg-red-500 absolute -right-0.5 -top-0.5"></div>
        ) : null}
      </div>
    </div>
  );
};

export default InputComp;
