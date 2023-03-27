"use client";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";

interface PathProps {
  notes: string[];
  folders: string[];
  closeForm: () => void;
  getFiles: () => Promise<void>;
}

interface PathsData {
  dateCreated: Date;
  folderColor: string;
  folderId: number;
  folderKey: string;
  name: string;
  owner: number;
  path: string;
  textColor: string;
}

const Paths: React.FC<PathProps> = (props) => {
  const [paths, setPaths] = React.useState<PathsData[]>([]);
  const { url } = useGlobalContext();
  const router = useRouter();

  const getPaths = React.useCallback(async () => {
    const token = localStorage.getItem("write_token");

    if (token) {
      await fetch(`${url}/folder`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }).then((request) => {
        if (request.ok) {
          request.json().then((response) => setPaths(response));
        } else {
          throw new Error(request.statusText);
        }
      });
    } else {
      router.push("login");
    }
  }, [setPaths]);

  const moveFiles = async (path: string) => {
    const token = localStorage.getItem("write_token");

    if (token) {
      await fetch(`${url}/all`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ notes: props.notes, folders: props.folders, path }),
      }).then((request) => {
        if (request.ok) {
          props.getFiles();
          props.closeForm();
        } else {
          throw new Error(request.statusText);
        }
      });
    } else {
      router.push("login");
    }
  };

  console.log(paths);

  React.useEffect(() => {
    getPaths();
  }, [getPaths]);

  return (
    <div className="fixed w-full h-full top-0 left-0 backdrop-blur-sm z-30 cstm-flex-col">
      <div
        className="w-11/12 p-2 rounded-md shadow-md shadow-neutral-600 bg-blk1 cstm-flex-col gap-2
                      t:w-6/12
                      l-s:w-5/12
                      l-l:w-4/12"
      >
        <BsArrowLeft onClick={props.closeForm} className="mr-auto cursor-pointer text-wht" />
        <p className="font-noto font-bold text-wht">Paths</p>
        <div
          className="w-full rounded-md text-wht p-2 border-[1px] border-wht bg-gry2 text-center 
                            font-mono hover:bg-blk2 transition-all cursor-pointer"
          onClick={() => moveFiles("0")}
        >
          Home
        </div>
        {paths.length
          ? paths.map((path) => {
              return (
                <div
                  key={path.folderId}
                  className="w-full rounded-md text-wht p-2 border-[1px] border-wht bg-gry2 text-center 
                            font-mono hover:bg-blk2 transition-all cursor-pointer"
                  onClick={() => moveFiles(path.folderKey)}
                >
                  {path.name}
                </div>
              );
            })
          : "No available paths"}
      </div>
    </div>
  );
};

export default Paths;
