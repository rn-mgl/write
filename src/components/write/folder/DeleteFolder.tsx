import React from "react";
import ButtonComp from "../../input/Button";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "context";

interface DeleteFormProps {
  toggleDeleteFolder: () => void;
  folderKey: string;
  prevPath: string;
}

const DeleteFolder: React.FC<DeleteFormProps> = (props) => {
  const { url } = useGlobalContext();
  const router = useRouter();

  const escapeClose = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      props.toggleDeleteFolder();
    }
  };

  const deleteNote = async () => {
    const token = localStorage.getItem("write_token");
    if (token) {
      const req = await fetch(`${url}/folder/${props.folderKey}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((result) => router.push(props.prevPath));
    } else {
      router.push("login");
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => escapeClose(e)}
      className="fixed z-20 left-0 top-0 w-full h-screen backdrop-blur-sm"
    >
      <div
        className="absolute w-full h-fit left-2/4 -translate-x-2/4 cstm-flex-col p-5 gap-2 z-30 text-wht
                top-2/4 -translate-y-2/4 t:w-6/12 l-s:w-4/12 l-l:w-3/12"
      >
        <div className="w-full p-2 h-fit cstm-grdbg-blk-1-2 rounded-md border-[1px] border-gry2 cstm-flex-col gap-2">
          <div className="cstm-flex-col">
            <p className="text-center font-noto font-semibold">Delete Folder?</p>
            <p className="text-center font-work text-xs t:text-base">
              folders and its content cannot be retrieved once deleted
            </p>
          </div>
          <div className="cstm-flex-row w-full gap-2">
            <ButtonComp
              onClick={props.toggleDeleteFolder}
              label="No"
              style="bg-blk1 text-wht w-full border-2"
              type="submit"
            />
            <ButtonComp
              onClick={deleteNote}
              label="Yes"
              style="bg-wht text-blk2 w-full border-2"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteFolder;
