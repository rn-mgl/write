"use client";
import React from "react";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";

import NoteBlock from "@/src/components/write/global/NoteBlock";
import ButtonComp from "@/src/components/input/Button";
import AddNoteForm from "@/src/components/write/addNote/AddNoteForm";
import AddFolderForm from "@/src/components/write/addFolder/AddFolderForm";
import FolderBlock from "@/src/components/write/global/FolderBlock";
import Loading from "@/src/components/global/Loading";
import SelectActions from "@/src/components/global/SelectActions";
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

export default function MainPage() {
  const [files, setFiles] = React.useState([]);
  const [canAddNote, setCanAddNote] = React.useState(false);
  const [canAddFolder, setCanAddFolder] = React.useState(false);
  const [canMoveFiles, setCanMoveFiles] = React.useState(false);
  const [selectedNotes, setSelectedNotes] = React.useState<string[]>([]);
  const [selectedFolders, setSelectedFolders] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { url } = useGlobalContext();
  const router = useRouter();

  const getFiles = React.useCallback(async () => {
    const token = localStorage.getItem("write_token");
    if (token) {
      setLoading(true);
      await fetch(`${url}/all`, {
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
          setFiles(result);
          setLoading(false);
        });
    } else {
      router.push("login");
    }
  }, [setFiles, fetch, setLoading]);

  const deleteFiles = async () => {
    const token = localStorage.getItem("write_token");

    if (token) {
      setLoading(true);
      const data = await fetch(`${url}/all`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ notes: selectedNotes, folders: selectedFolders }),
      }).then((request) => {
        if (request.ok) {
          request.json().then((response) => {
            setLoading(false);
            getFiles();
          });
        } else {
          throw new Error(request.statusText);
        }
      });
    } else {
      router.push("login");
    }
  };

  const handleAddNote = () => {
    setCanAddNote((prev) => !prev);
  };

  const handleAddFolder = () => {
    setCanAddFolder((prev) => !prev);
  };

  const handleMoveFiles = () => {
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
    <div className="cstm-grdbg-blk-1-2 min-h-screen h-auto pt-28 p-5 cstm-flex-col justify-start">
      {loading ? <Loading /> : null}
      {canAddNote ? <AddNoteForm getFiles={getFiles} closeForm={handleAddNote} path="0" /> : null}
      {canAddFolder ? (
        <AddFolderForm getFiles={getFiles} closeForm={handleAddFolder} path="0" />
      ) : null}
      {canMoveFiles ? (
        <Paths
          closeForm={handleMoveFiles}
          getFiles={getFiles}
          notes={selectedNotes}
          folders={selectedFolders}
        />
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
        {selectedNotes.length || selectedFolders.length ? (
          <SelectActions handleMoveFiles={handleMoveFiles} deleteFiles={deleteFiles} />
        ) : null}
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
