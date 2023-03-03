"use client";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import ButtonComp from "../../input/Button";
import InputComp from "../../input/Input";

interface NoteForm {
  name: string;
  content: string;
}

interface FormProps {
  closeForm: () => void;
  getFiles: (token: string, url: string) => Promise<void>;
  path: string;
}

const AddFolderForm: React.FC<FormProps> = (props) => {
  const [formData, setFormData] = React.useState<NoteForm>({ name: "", content: "" });
  const { url } = useGlobalContext();
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("write_token");

    if (token) {
      try {
        const req = await fetch(`${url}/folder`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({
            name: formData.name,
            content: formData.content,
            path: props.path ? props.path : "0",
          }),
        })
          .then((response) => response.json())
          .then((result) => props.getFiles(token, url))
          .then(() => props.closeForm());
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("login");
    }
  };

  return (
    <div className="left-0 top-0 cstm-flex-col fixed w-full h-full backdrop-blur-sm p-5">
      <div className="cstm-flex-col p-3 rounded-md bg-blk2 w-full h-fit text-wht shadow-md shadow-blk1 t:w-6/12 l-s:w-4/12">
        <BsArrowLeft onClick={props.closeForm} className="mr-auto mb-auto cursor-pointer" />
        <form className="w-full mb-auto cstm-flex-col gap-2" onSubmit={(e) => submitForm(e)}>
          <InputComp
            name="name"
            label="Title"
            placeholder="Title"
            onChange={(e) => handleInput(e)}
            value={formData.name}
            required={true}
            type="text"
            style="w-full bg-gry2"
          />
          <ButtonComp label="Create" style="bg-wht text-blk2 w-full" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddFolderForm;
