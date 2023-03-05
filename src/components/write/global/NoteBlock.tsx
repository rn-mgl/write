import React from "react";
import Link from "next/link";

interface NoteType {
  fileId: number;
  fileKey: string;
  owner: number;
  name: string;
  path: number;
  content: string;
  dateCreated: Date;
}

interface NoteBlockProps {
  note: NoteType;
}

const NoteBlock: React.FC<NoteBlockProps> = ({ note }) => {
  const hasTitle = note.name !== "";
  const hasContent = note.content !== "";
  return (
    <Link
      href={`/write/n/${note.fileKey}`}
      className="p-5 inline-block rounded-md border-gry1 border-[1px] w-full h-28 overflow-hidden l-s:w-full
                hover:shadow-md hover:shadow-gry2"
    >
      <p className={`${!hasTitle && "opacity-50"} font-noto font-semibold text-wht mb-2`}>
        {hasTitle ? note.name : "No Title"}
      </p>
      <p className={`${!hasContent && "opacity-50"} font-work font-light text-gry1 w-full`}>
        {hasContent ? note.content : "No Content"}
      </p>
    </Link>
  );
};

export default NoteBlock;
