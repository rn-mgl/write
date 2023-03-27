"use client";
import React from "react";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";

import FolderColor from "@/src/components/write/folder/FolderColor";
import NoteBlock from "@/src/components/write/global/NoteBlock";
import ButtonComp from "@/src/components/input/Button";
import AddNoteForm from "@/src/components/write/addNote/AddNoteForm";
import AddFolderForm from "@/src/components/write/addFolder/AddFolderForm";
import FolderBlock from "@/src/components/write/global/FolderBlock";
import { BsArrowLeft } from "react-icons/bs";

import Link from "next/link";
import FolderActions from "@/src/components/write/folder/FolderActions";
import TextColor from "@/src/components/write/folder/TextColor";
import DeleteFolder from "@/src/components/write/folder/DeleteFolder";
import Loading from "@/src/components/global/Loading";
import Paths from "@/src/components/global/Paths";

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

interface FolderData {
  folderId: number;
  folderKey: string;
  owner: number;
  folderColor: string;
  textColor: string;
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
    folderColor: "",
    textColor: "",
    name: "",
    path: "",
    dateCreated: new Date(),
  });
  const [canAddNote, setCanAddNote] = React.useState(false);
  const [canAddFolder, setCanAddFolder] = React.useState(false);
  const [canDeleteFolder, setCanDeleteFolder] = React.useState(false);
  const [canChangeFillColor, setChangeFillColor] = React.useState(false);
  const [canChangeTextColor, setChangeTextColor] = React.useState(false);
  const [canMoveFiles, setCanMoveFiles] = React.useState(false);
  const [selectedNotes, setSelectedNotes] = React.useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { url } = useGlobalContext();
  const { folderKey } = params;
  const router = useRouter();

  const prevPath = folderData?.path === "0" ? `write` : `/write/f/${folderData?.path}`;

  const getFiles = React.useCallback(async () => {
    const token = localStorage.getItem("write_token");
    if (token) {
      setLoading(true);
      fetch(`${url}/folder/${folderKey}`, {
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
        .then((result) => {
          setFiles(result.files);
          setFolderData(result.folder);
          setLoading(false);
        });
    } else {
      router.push("login");
    }
  }, [setFiles, fetch]);

  const handleAddNote = () => {
    setCanAddNote((prev) => !prev);
  };

  const handleAddFolder = () => {
    setCanAddFolder((prev) => !prev);
  };

  const toggleDeleteFolder = () => {
    setCanDeleteFolder((prev) => !prev);
  };

  const toggleChangeFillColor = () => {
    setChangeFillColor((prev) => !prev);
  };

  const toggleChangeTextColor = () => {
    setChangeTextColor((prev) => !prev);
  };

  const toggleMoveFiles = () => {
    setCanMoveFiles((prev) => !prev);
  };

  const selectNote = (fileKey: string) => {
    setSelectedNotes((prev: string[]): string[] =>
      prev.indexOf(fileKey) === -1 ? prev.concat([fileKey]) : prev.filter((val) => val !== fileKey)
    );
  };

  const selectFolder = (fileKey: string) => {
    setSelectedFolders((prev: string[]): string[] =>
      prev.indexOf(fileKey) === -1 ? prev.concat([fileKey]) : prev.filter((val) => val !== fileKey)
    );
  };

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      getFiles();
    } else {
      router.push("login");
    }
  }, [getFiles, router]);

  return (
    <div
      className="cstm-grdbg-blk-1-2 min-h-screen h-auto p-5 pt-28 cstm-flex-col justify-start gap-2 border-2"
      style={{ borderColor: folderData.folderColor }}
    >
      {loading ? <Loading /> : null}
      {canAddNote ? (
        <AddNoteForm getFiles={getFiles} closeForm={handleAddNote} path={folderKey} />
      ) : null}
      {canAddFolder ? (
        <AddFolderForm closeForm={handleAddFolder} getFiles={getFiles} path={folderKey} />
      ) : null}
      {canChangeFillColor ? (
        <FolderColor
          toggleChangeFillColor={toggleChangeFillColor}
          folderKey={folderKey}
          folderColor={folderData.folderColor}
          getFiles={getFiles}
        />
      ) : null}
      {canChangeTextColor ? (
        <TextColor
          toggleChangeTextColor={toggleChangeTextColor}
          getFiles={getFiles}
          folderKey={folderKey}
          textColor={folderData.textColor}
        />
      ) : null}
      {canDeleteFolder ? (
        <DeleteFolder
          toggleDeleteFolder={toggleDeleteFolder}
          folderKey={folderKey}
          prevPath={prevPath}
        />
      ) : null}
      {canMoveFiles ? (
        <Paths
          closeForm={toggleMoveFiles}
          getFiles={getFiles}
          notes={selectedNotes}
          folders={selectedFolders}
        />
      ) : null}
      <div className="w-full cstm-flex-col gap-5 t:w-7/12 ">
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
        <div className="cstm-flex-row w-full gap-2">
          <p
            className="font-noto font-extrabold text-wht text-xl mr-auto"
            style={{ color: folderData.textColor }}
          >
            {folderData?.name}
          </p>
          <FolderActions
            toggleChangeFillColor={toggleChangeFillColor}
            toggleChangeTextColor={toggleChangeTextColor}
            toggleDeleteFolder={toggleDeleteFolder}
            toggleMoveFiles={toggleMoveFiles}
          />
        </div>

        <div
          className="w-full cstm-flex-col gap-3 
                    l-s:cstm-flex-row  l-s:grid l-s:grid-cols-3 l-s:items-start"
        >
          {files.map((file: FileBlockProps) => {
            return file.type === "note" ? (
              <NoteBlock
                selectNote={selectNote}
                selectedNotes={selectedNotes}
                key={file.fileKey}
                note={file}
              />
            ) : (
              <FolderBlock
                selectFolder={selectFolder}
                selectedFolders={selectedFolders}
                key={file.fileKey}
                folder={file}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
