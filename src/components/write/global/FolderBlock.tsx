import React from "react";

import Link from "next/link";

interface FolderType {
  fileId: number;
  fileKey: string;
  owner: number;
  name: string;
  path: number;
  color: string;
  dateCreated: Date;
}

interface FolderBlockProps {
  folder: FolderType;
}

const FolderBlock: React.FC<FolderBlockProps> = ({ folder }) => {
  return (
    <Link
      href={`/write/f/${folder.fileKey}`}
      className="p-5 rounded-md border-gry1 self-stretch border-[1px] w-full overflow-hidden bg-gry1 l-s:w-full
                hover:shadow-md hover:shadow-gry2"
    >
      <p className="font-noto font-semibold text-blk2">{folder.name}</p>
    </Link>
  );
};

export default FolderBlock;
