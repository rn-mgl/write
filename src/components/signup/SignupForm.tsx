import React from "react";
import ButtonComp from "../input/Button";
import InputComp from "../input/Input";

interface InputValue {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface FormProps {
  value: InputValue;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignupForm: React.FC<FormProps> = (props): React.ReactElement => {
  return (
    <form
      method="post"
      onSubmit={(e) => props.onSubmit(e)}
      className="cstm-flex-col gap-2 w-full t:w-8/12 l-s:w-6/12 l-l:w-3/12"
    >
      <div
        className="w-full rounded-md border-[1px] border-opacity-30 border-wht p-2 
                  bg-wht bg-opacity-10 shadow-md shadow-gry2
                  "
      >
        <InputComp
          name="name"
          value={props.value.name}
          onChange={(e) => props.onChange(e)}
          placeholder="Your Name"
          label="Name"
          required={true}
          style=" focus:shadow-md focus:shadow-gry2 focus:rounded-full focus:px-4"
        />

        <InputComp
          name="surname"
          value={props.value.surname}
          onChange={(e) => props.onChange(e)}
          placeholder="Your Surname"
          label="Surname"
          required={true}
          style="focus:shadow-md focus:shadow-gry2 focus:rounded-full focus:px-4"
        />

        <InputComp
          name="email"
          value={props.value.email}
          onChange={(e) => props.onChange(e)}
          placeholder="Your Email"
          label="Email"
          required={true}
          style="focus:shadow-md focus:shadow-gry2 focus:rounded-full focus:px-4"
          type="email"
        />

        <InputComp
          name="password"
          value={props.value.password}
          onChange={(e) => props.onChange(e)}
          placeholder="Your Password"
          label="Password"
          required={true}
          style="focus:shadow-md focus:shadow-gry2 focus:rounded-full focus:px-4"
          type="password"
        />
      </div>

      <ButtonComp label="Sign Up" type="submit" style="cstm-grdbg-wht-1-2 w-full" />
    </form>
  );
};

export default SignupForm;
