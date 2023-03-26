"use client";
import React from "react";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface FolderType {
  fileId: number;
  fileKey: string;
  owner: number;
  name: string;
  path: number;
  bgColor: string;
  textColor: string;
  dateCreated: Date;
}

interface FolderBlockProps {
  folder: FolderType;
  selectFolder: (key: string) => void;
  selectedFolders: string[];
}

const FolderBlock: React.FC<FolderBlockProps> = (props) => {
  const hasName = props.folder.name !== "" && props.folder.name !== undefined;
  const isSelected = props.selectedFolders.includes(props.folder.fileKey) ? "flex" : "hidden";
  return (
    <div className="relative group w-full">
      <BsFillCheckCircleFill
        onClick={() => props.selectFolder(props.folder.fileKey)}
        className={`${isSelected} absolute -top-3 -left-3 z-10 text-wht group-hover:flex cursor-pointer`}
      />
      <Link
        href={`/write/f/${props.folder.fileKey}`}
        className="relative p-5 inline-block  rounded-md border-gry1 w-full self-stretch border-[1px] h-28 bg-gry1 l-s:w-full
                hover:scale-105 transition-all group
                hover:shadow-md hover:shadow-gry2"
        style={{ background: props.folder.bgColor }}
      >
        <p
          className={`${
            hasName ? "opacity-100" : "opacity-50"
          } font-noto font-semibold text-blk2 truncate`}
          style={{ color: props.folder.textColor }}
        >
          {hasName ? props.folder.name : "No Name"}
        </p>
      </Link>
    </div>
  );
};

export default FolderBlock;
