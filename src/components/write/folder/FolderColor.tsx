"use client";
import React from "react";
import InputComp from "../../input/Input";
import ButtonComp from "../../input/Button";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";

interface FolderColorProps {
  toggleChangeFillColor: () => void;
  folderKey: string;
  folderColor: string;
  getFiles: (token: string, url: string) => Promise<void>;
}

const FolderColor: React.FC<FolderColorProps> = (props) => {
  const [folderColor, setFolderColor] = React.useState<string>(props.folderColor);
  const { url } = useGlobalContext();
  const router = useRouter();

  const updateNoteColor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("write_token");

    if (token) {
      const req = await fetch(
        `${url}/folder/${props.folderKey}?` + new URLSearchParams({ type: "folderColor" }),
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: token },
          body: JSON.stringify({ folderColor }),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((result) => {
          props.toggleChangeFillColor(), props.getFiles(token, url);
        });
    } else {
      router.push("login");
    }
  };

  const escapeClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      props.toggleChangeFillColor();
    }
  };

  const pickColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFolderColor(value);
  };

  return (
    <div
      tabIndex={0}
      className="fixed backdrop-blur-sm top-0 left-0 w-full min-h-screen cstm-flex-col p-5 z-20"
      onKeyDown={(e) => escapeClose(e)}
    >
      <form
        className="w-full cstm-flex-col gap-2 m-l:w-10/12 t:w-5/12 l-s:w-4/12 l-l:w-3/12"
        onSubmit={(e) => updateNoteColor(e)}
      >
        <InputComp
          label="Pick a Color"
          name="bgColor"
          placeholder="bgColor"
          onChange={(e) => pickColor(e)}
          value={folderColor}
          type="color"
          style="h-28 cursor-pointer"
        />
        <ButtonComp
          label="Change"
          style="bg-wht border-2 border-wht w-full text-blk2"
          type="submit"
        />
        <ButtonComp
          onClick={props.toggleChangeFillColor}
          label="Close"
          style="border-wht border-2 w-full text-wht"
          type="button"
        />
      </form>
    </div>
  );
};

export default FolderColor;
