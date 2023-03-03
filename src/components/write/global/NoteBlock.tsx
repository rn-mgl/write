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
  return (
    <Link
      href={`/write/n/${note.fileKey}`}
      className="p-5 inline-block rounded-md border-gry1 border-[1px] w-full h-28 overflow-hidden l-s:w-full
                hover:shadow-md hover:shadow-gry2"
    >
      <p className="font-noto font-semibold text-wht">{note.name}</p>
      <p className="font-work font-light text-gry1 w-full">{note.content}</p>
    </Link>
  );
};

export default NoteBlock;
