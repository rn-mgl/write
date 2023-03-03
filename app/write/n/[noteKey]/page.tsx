"use client";
import LinkComp from "@/src/components/input/Link";
import { useGlobalContext } from "context";
import { useRouter } from "next/navigation";
import React from "react";

interface NoteType {
  noteId: number;
  noteKey: string;
  owner: number;
  name: string;
  path: string;
  content: string;
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
    dateCreated: new Date(),
  });
  const { url } = useGlobalContext();
  const { noteKey } = params;
  const router = useRouter();

  const closePath = noteData?.path === "0" ? "write" : `/write/f/${noteData?.path}`;

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
    try {
      await fetch(`${url}/note/${noteKey}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((response) => response.json())
        .then((result) => setNoteData(result));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateNote = async (token: string) => {
    try {
      await fetch(`${url}/note/${noteKey}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({
          name: noteData.name,
          content: noteData.content,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("write_token");
    if (token) {
      getNoteData(token, url);
    } else {
      router.push("login");
    }
  }, [getNoteData]);

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
    <div className="min-h-screen p-5 text-wht cstm-flex-col ">
      <div
        className="absolute h-[80%] max-h-[80%] w-10/12 rounded-md cstm-flex-col shadow-md shadow-blk1
                  t:w-8/12
                  l-s:w-6/12"
      >
        <div className="w-full mb-auto border-[1px] h-full border-wht rounded-t-md p-5 pb-20">
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Title"
            name="name"
            className="bg-transparent w-full resize-none font-noto font-semibold focus:outline-none focus:border-none
                      cstm-scrollbar
                        text-wht "
            value={noteData.name}
          />
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Body"
            name="content"
            className="bg-transparent font-light w-full h-full resize-none focus:outline-none focus:border-none tracking-wide scroll-m-0 scroll-p-0
                      cstm-scrollbar
                        text-wht"
            value={decodeEntities(noteData.content)}
          />
        </div>
        <LinkComp
          label="Close"
          style="hover:underline relative w-full underline-offset-2 p-2 bg-wht rounded-t-none text-blk2"
          link={closePath}
        />
      </div>
    </div>
  );
}
