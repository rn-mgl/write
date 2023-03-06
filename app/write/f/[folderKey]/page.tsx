"use client";
import React from "react";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";

import NoteBlock from "@/src/components/write/global/NoteBlock";
import ButtonComp from "@/src/components/input/Button";
import AddNoteForm from "@/src/components/write/addNote/AddNoteForm";
import AddFolderForm from "@/src/components/write/addFolder/AddFolderForm";
import FolderBlock from "@/src/components/write/global/FolderBlock";
import { BsArrowLeft } from "react-icons/bs";
import LinkComp from "@/src/components/input/Link";
import Link from "next/link";

interface FileBlockProps {
  fileId: number;
  fileKey: string;
  owner: number;
  name: string;
  path: number;
  content: string;
  color: string;
  type: "note" | "folder";
  dateCreated: Date;
}

interface FolderData {
  folderId: number;
  folderKey: string;
  owner: number;
  color: string;
  name: string;
  path: string;
  dateCreated: Date;
}

export default function FolderPage({ params }: { params: { folderKey: string } }) {
  const [files, setFiles] = React.useState([]);
  const [folderData, setFolderData] = React.useState<FolderData>({
    folderId: -1,
    folderKey: "",
    owner: -1,
    color: "",
    name: "",
    path: "",
    dateCreated: new Date(),
  });
  const [canAddNote, setCanAddNote] = React.useState(false);
  const [canAddFolder, setCanAddFolder] = React.useState(false);

  const { url } = useGlobalContext();
  const { folderKey } = params;
  const router = useRouter();

  const prevPath = folderData?.path === "0" ? `write` : `/write/f/${folderData?.path}`;

  const getFiles = React.useCallback(
    async (token: string, url: string) => {
      try {
        fetch(`${url}/folder/${folderKey}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: token },
        })
          .then((response) => response.json())
          .then((result) => {
            setFiles(result.files);
            setFolderData(result.folder);
          });
      } catch (error) {
        console.log(error);
      }
    },
    [setFiles, fetch]
  );

  const handleAddNote = () => {
    setCanAddNote((prev) => !prev);
  };

  const handleAddFolder = () => {
    setCanAddFolder((prev) => !prev);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      getFiles(token, url);
    } else {
      router.push("login");
    }
  }, [getFiles, router]);

  return (
    <div className="p-5 cstm-flex-col justify-start gap-2 ">
      {canAddNote ? (
        <AddNoteForm getFiles={getFiles} closeForm={handleAddNote} path={folderKey} />
      ) : null}
      {canAddFolder ? (
        <AddFolderForm closeForm={handleAddFolder} getFiles={getFiles} path={folderKey} />
      ) : null}
      <div className="w-full cstm-flex-col gap-5 t:w-8/12 ">
        <div className="cstm-flex-row gap-3 w-full ">
          <Link
            href={prevPath}
            className="cstm-flex-row mr-auto font-noto font-light text-wht p-2 hover:text-blk2 hover:bg-gry1 transition-all rounded-full"
          >
            <BsArrowLeft />
          </Link>
          <div className="cstm-flex-row w-8/12 gap-3 t:w-6/12 l-s:w-4/12 l-l:w-3/12">
            <ButtonComp
              label={`+ Note`}
              style="bg-wht border-2 border-wht w-full rounded-full"
              type="button"
              onClick={handleAddNote}
            />
            <ButtonComp
              label="+ Folder"
              style="border-2 border-wht text-wht w-full rounded-full"
              type="button"
              onClick={handleAddFolder}
            />
          </div>
        </div>

        <p className="font-noto font-extrabold text-wht text-xl">{folderData?.name}</p>

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
