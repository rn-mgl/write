"use client";

import React from "react";
import DeleteNote from "@/src/components/write/note/DeleteNote";
import NoteActions from "@/src/components/write/note/NoteActions";
import Link from "next/link";

import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "context";
import NoteColor from "@/src/components/write/note/NoteColor";
import TextColor from "@/src/components/write/note/TextColor";

interface NoteType {
  noteId: number;
  noteKey: string;
  owner: number;
  name: string;
  path: string;
  content: string;
  noteColor: string;
  textColor: string;
  dateCreated: Date;
}

export default function page({ params }: { params: { noteKey: string } }) {
  const [noteData, setNoteData] = React.useState<NoteType>({
    noteId: -1,
    noteKey: "",
    owner: -1,
    name: "",
    path: "",
    content: "",
    noteColor: "#595959",
    textColor: "#ffffff",
    dateCreated: new Date(),
  });
  const [canDeleteNote, setCanDeleteNote] = React.useState(false);
  const [canChangeFillColor, setChangeFillColor] = React.useState(false);
  const [canChangeTextColor, setChangeTextColor] = React.useState(false);

  const { url } = useGlobalContext();
  const { noteKey } = params;
  const router = useRouter();
  const noteColor = noteData.noteColor;
  const textColor = noteData.textColor;

  const returnPath = noteData?.path === "0" ? "write" : `/write/f/${noteData?.path}`;

  // copy pasted
  const decodeEntities = (s: string): any => {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate: any = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
    };
    return s
      .replace(translate_re, (match, entity): any => {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, (match, numStr) => {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setNoteData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getNoteData = React.useCallback(async (token: string, url: string) => {
    await fetch(`${url}/note/${noteKey}`, {
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
      .then((result) => setNoteData(result));
  }, []);

  const updateNote = async (token: string) => {
    await fetch(`${url}/note/${noteKey}?` + new URLSearchParams({ type: "content" }), {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        name: noteData.name,
        content: noteData.content,
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    });
  };

  const toggleDeleteNote = () => {
    setCanDeleteNote((prev) => !prev);
  };

  const toggleChangeFillColor = () => {
    setChangeFillColor((prev) => !prev);
  };

  const toggleChangeTextColor = () => {
    setChangeTextColor((prev) => !prev);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      getNoteData(token, url);
    } else {
      router.push("login");
    }
  }, [getNoteData, router]);

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      const timer = setTimeout(() => {
        updateNote(token);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      router.push("login");
    }
  }, [noteData]);

  return (
    <div className="cstm-grdbg-blk-1-2 min-h-screen h-auto p-5 text-wht cstm-flex-col">
      {canDeleteNote ? (
        <DeleteNote returnPath={returnPath} noteKey={noteKey} toggleDeleteNote={toggleDeleteNote} />
      ) : null}

      {canChangeFillColor ? (
        <NoteColor
          noteColor={noteData.noteColor}
          noteKey={noteKey}
          toggleChangeFillColor={toggleChangeFillColor}
          getNoteData={getNoteData}
        />
      ) : null}

      {canChangeTextColor ? (
        <TextColor
          textColor={noteData.textColor}
          noteKey={noteKey}
          toggleChangeTextColor={toggleChangeTextColor}
          getNoteData={getNoteData}
        />
      ) : null}

      <div
        className="z-10 absolute top-2/4 -translate-y-2/4 h-[80%] max-h-[80%] w-10/12 rounded-md cstm-flex-col  gap-2
                  t:w-8/12
                  l-s:w-6/12"
      >
        <Link
          href={returnPath}
          className="p-2 mr-auto hover:bg-gry1 hover:text-blk2 rounded-full transition-all"
        >
          <BsArrowLeft />
        </Link>

        <div
          className="w-full mb-auto border-[1px] h-full border-gry2 rounded-md p-5 overflow-hidden shadow-md shadow-blk1"
          style={{
            borderColor: noteColor,
            boxShadow: noteColor,
            background: noteColor,
          }}
        >
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Title"
            name="name"
            className="bg-transparent w-full resize-none pt-2 px-2 font-noto font-semibold focus:outline-none focus:border-none
                      cstm-scrollbar
                        text-wht "
            value={noteData.name}
            style={{ color: textColor }}
          />
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Body"
            name="content"
            className="bg-transparent font-light px-2 pb-2 w-full h-[90%] resize-none focus:outline-none focus:border-none tracking-wide
                      cstm-scrollbar
                        text-wht"
            value={decodeEntities(noteData.content)}
            style={{ color: textColor }}
          />
        </div>
        <NoteActions
          toggleChangeFillColor={toggleChangeFillColor}
          toggleDeleteNote={toggleDeleteNote}
          toggleChangeTextColor={toggleChangeTextColor}
        />
      </div>
    </div>
  );
}
