import React, { ReactElement } from "react";
import InputComp from "../input/Input";
import ButtonComp from "../input/Button";

interface InputValue {
  candidateEmail: string;
  candidatePassword: string;
}

interface FormProps {
  value: InputValue;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<FormProps> = (props): ReactElement => {
  return (
    <form
      method="post"
      onSubmit={(e) => props.onSubmit(e)}
      className="cstm-flex-col gap-2 w-full t:w-6/12  l-l:w-3/12"
    >
      <div
        className="w-full rounded-md border-[1px] border-opacity-30 border-wht p-2 
                  bg-wht bg-opacity-10 shadow-md shadow-gry2"
      >
        <InputComp
          name="candidateEmail"
          placeholder="Email"
          value={props.value.candidateEmail}
          label="Email"
          required={true}
          onChange={(e) => props.onChange(e)}
          style="focus:shadow-md focus:shadow-gry2 focus:rounded-full focus:px-4"
          type="email"
        />
        <InputComp
          name="candidatePassword"
          placeholder="Password"
          value={props.value.candidatePassword}
          label="Password"
          required={true}
          onChange={(e) => props.onChange(e)}
          style="focus:shadow-md focus:shadow-gry2 focus:rounded-full focus:px-4"
          type="password"
        />
      </div>

      <ButtonComp label="Log In" type="submit" style="cstm-grdbg-wht-1-2 w-full" />
    </form>
  );
};

export default LoginForm;
