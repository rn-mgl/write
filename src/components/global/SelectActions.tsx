import React from "react";
import { BsTrash } from "react-icons/bs";
import { RiFileTransferLine } from "react-icons/ri";

interface ActionProps {
  deleteFiles: () => Promise<void>;
  handleMoveFiles: () => void;
}

const SelectActions: React.FC<ActionProps> = (props) => {
  return (
    <div className="cstm-flex-row gap-5 ml-auto text-wht z-20">
      <div
        className="relative p-1 rounded-full hover:bg-gry2 transition-all cursor-pointer group"
        onClick={props.handleMoveFiles}
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
        onClick={props.deleteFiles}
      >
        <BsTrash />
        <p
          className="absolute left-2/4 -translate-x-2/4 bg-gry2 p-1 rounded-md mt-2 font-noto text-xs 
                hidden group-hover:flex whitespace-nowrap"
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default SelectActions;
