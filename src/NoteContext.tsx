import React, { createContext, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteContextType, NoteData, RawNote, Tag } from "./types";

export const NoteContext = createContext<NoteContextType|undefined>(undefined);

function NoteContextProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [value, setValue] = useState<Tag[]>([]);

  const noteContext: NoteContextType = {
    notesWithTags: useMemo(() => {
      return notes.map(note => {
        return {
          ...note,
          tags: tags.filter(tag => note.tagIds.includes(tag.id)),
        };
      });
    }, [notes, tags]),
    saveNote: ({ tags, ...data }: NoteData) => {
      setNotes((prevNotes) => {
        return [
          ...prevNotes,
          {
            ...data,
            id: uuid(),
            tagIds: tags.map((tag) => tag.id),
          },
        ];
      });
    },
    tags,
    addTag: (tag: Tag) => {
      setTags((prev) => [...prev, tag]);
    },
    onDeleteTag:(id: string) => {
      setTags(prevTags=>{
        return prevTags.filter(tag=> tag.id !== id)
      })
    },
    onUpdateTag:(id:String,label:string)=>{
      setTags(prevTags=>{
        return prevTags.map(tag=>{
          if (tag.id === id){
            return {...tag,label}
          }else return tag
        })
      })
    },
    onUpdateNote:(id:string,{tags,...data}:Note)=>{
      setNotes(prevNotes=>{
        return prevNotes.map(note=>{
          if (note.id === id){
            return {...note,...data,tagIds:tags.map(tag=> tag.id)}
          }else return note

        })
      })
    },
    onDeleteNote:(id:string) => {
      setNotes(prevNotes=>{
        return prevNotes.filter(note=> note.id!==id)
      })
    }
  };

  return (
    <NoteContext.Provider value={noteContext}>{children}</NoteContext.Provider>
  );
}

export default NoteContextProvider;
