import React from "react";
import Link from "next/link";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface NoteType {
  fileId: number;
  fileKey: string;
  owner: number;
  name: string;
  path: number;
  content: string;
  dateCreated: Date;
  bgColor: string;
}

interface NoteBlockProps {
  note: NoteType;
  selectNote: (key: string) => void;
  selectedNotes: string[];
}

const NoteBlock: React.FC<NoteBlockProps> = (props) => {
  const hasTitle = props.note.name !== "";
  const hasContent = props.note.content !== "";
  const _borderColor = props.note.bgColor ? props.note.bgColor : "#595959";
  const isSelected = props.selectedNotes.includes(props.note.fileKey) ? "flex" : "hidden";
  return (
    <div className="relative group w-full">
      <BsFillCheckCircleFill
        className={`${isSelected} absolute -top-3 -left-3 z-10 text-wht group-hover:flex cursor-pointer`}
        onClick={() => props.selectNote(props.note.fileKey)}
      />
      <Link
        href={`/write/n/${props.note.fileKey}`}
        className={`relative p-5 inline-block rounded-md border-gry2 border-[1px] w-full h-28 l-s:w-full 
               hover:scale-105 transition-all cstm-grdbg-neutral-1-2 
              hover:shadow-md hover:shadow-gry2`}
        style={{ borderBottomColor: _borderColor, boxShadow: _borderColor }}
      >
        <p className={`${!hasTitle && "opacity-50"} font-noto font-semibold text-wht mb-2`}>
          {hasTitle ? props.note.name : "No Title"}
        </p>
        <p
          className={`${
            !hasContent && "opacity-50"
          } font-work font-light text-gry1 w-full overflow-hidden truncate`}
        >
          {hasContent ? props.note.content : "No Content"}
        </p>
      </Link>
    </div>
  );
};

export default NoteBlock;
