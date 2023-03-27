import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdOutlineFormatColorFill, MdOutlineFormatColorText } from "react-icons/md";
import { RiFileTransferLine } from "react-icons/ri";

interface NoteActionProps {
  toggleDeleteNote: () => void;
  toggleChangeFillColor: () => void;
  toggleChangeTextColor: () => void;
  toggleMoveFiles: () => void;
}

const NoteActions: React.FC<NoteActionProps> = (props) => {
  return (
    <div className="cstm-flex-row w-full justify-start gap-5">
      <div
        className="relative p-1 rounded-full hover:bg-gry2 transition-all cursor-pointer group"
        onClick={props.toggleMoveFiles}
      >
        <RiFileTransferLine />
        <p
          className="absolute left-2/4 -translate-x-2/4 bg-gry2 p-1 rounded-md mt-2 font-noto text-xs 
                hidden group-hover:flex whitespace-nowrap"
        >
          Move Files
        </p>
      </div>
      <div
        className="relative p-1 rounded-full hover:bg-gry2 transition-all cursor-pointer group"
        onClick={props.toggleDeleteNote}
      >
        <BsTrash />
        <p
          className="absolute left-2/4 -translate-x-2/4 bg-gry2 p-1 rounded-md mt-2 font-noto text-xs 
                    hidden group-hover:flex whitespace-nowrap"
        >
          Delete
        </p>
      </div>
      <div
        className="relative p-1 rounded-full hover:bg-gry2 transition-all cursor-pointer group"
        onClick={props.toggleChangeFillColor}
      >
        <MdOutlineFormatColorFill />
        <p
          className="absolute left-2/4 -translate-x-2/4 bg-gry2 p-1 rounded-md mt-2 font-noto text-xs 
                    hidden group-hover:flex whitespace-nowrap"
        >
          Note Color
        </p>
      </div>
      <div
        className="relative p-1 rounded-full hover:bg-gry2 transition-all cursor-pointer group"
        onClick={props.toggleChangeTextColor}
      >
        <MdOutlineFormatColorText />
        <p
          className="absolute left-2/4 -translate-x-2/4 bg-gry2 p-1 rounded-md mt-2 font-noto text-xs 
                    hidden group-hover:flex whitespace-nowrap"
        >
          Text Color
        </p>
      </div>
    </div>
  );
};

export default NoteActions;
