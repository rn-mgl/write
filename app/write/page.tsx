"use client";
import React, { SetStateAction } from "react";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";

import NoteBlock from "@/src/components/write/global/NoteBlock";
import ButtonComp from "@/src/components/input/Button";
import AddNoteForm from "@/src/components/write/addNote/AddNoteForm";
import AddFolderForm from "@/src/components/write/addFolder/AddFolderForm";
import FolderBlock from "@/src/components/write/global/FolderBlock";

interface FileBlockProps {
  fileId: number;
  fileKey: string;
  owner: number;
  name: string;
  path: number;
  content: string;
  bgColor: string;
  textColor: string;
  type: "note" | "folder";
  dateCreated: Date;
}

export default function MainPage() {
  const [files, setFiles] = React.useState([]);
  const [canAddNote, setCanAddNote] = React.useState(false);
  const [canAddFolder, setCanAddFolder] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);

  const { url } = useGlobalContext();
  const router = useRouter();

  const getFiles = React.useCallback(
    async (token: string, url: string) => {
      fetch(`${url}/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then((result) => setFiles(result));
    },
    [setFiles, fetch]
  );

  const handleAddNote = () => {
    setCanAddNote((prev) => !prev);
  };

  const handleAddFolder = () => {
    setCanAddFolder((prev) => !prev);
  };

  const selectFile = (key: string) => {
    // setSelectedFiles((prev: SetStateAction<string[]>) =>
    //   orev. ? prev.splice(prev.indexOf(key, 1)) : prev.push(key)
    // );
  };
  console.log(selectedFiles);

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      getFiles(token, url);
    } else {
      router.push("login");
    }
  }, [getFiles, router]);

  return (
    <div className="cstm-grdbg-blk-1-2 min-h-screen h-auto pt-28 p-5 cstm-flex-col justify-start">
      {canAddNote ? <AddNoteForm getFiles={getFiles} closeForm={handleAddNote} path="0" /> : null}
      {canAddFolder ? (
        <AddFolderForm getFiles={getFiles} closeForm={handleAddFolder} path="0" />
      ) : null}

      <div className="w-full cstm-flex-col gap-3 t:w-7/12 ">
        <div className="cstm-flex-row gap-3 w-full ml-auto t:w-6/12 l-s:w-4/12 l-l:w-3/12">
          <ButtonComp
            label={`+ Note`}
            style="bg-wht border-2 border-wht w-full"
            type="button"
            onClick={handleAddNote}
          />
          <ButtonComp
            label="+ Folder"
            style="border-2 border-wht text-wht w-full"
            type="button"
            onClick={handleAddFolder}
          />
        </div>
        <div
          className="w-full cstm-flex-col gap-3 
                    l-s:cstm-flex-row  l-s:grid l-s:grid-cols-3 l-s:items-start"
        >
          {files.map((file: FileBlockProps) => {
            return file.type === "note" ? (
              <NoteBlock key={file.fileKey} note={file} />
            ) : (
              <FolderBlock key={file.fileKey} folder={file} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
