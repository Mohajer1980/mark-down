import { useContext } from "react";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { NoteContext } from "../NoteContext";
import { NoteContextType,Note } from "../types";

const NoteLayout = () => {
  const { id } = useParams();
  const { notesWithTags } = useContext(NoteContext) as NoteContextType;
  const note = notesWithTags.find(note=>note.id===id);

  if (!note) return <Navigate to='/' replace />

  return <Outlet context={note} />;
};

export function useNote() {
  return useOutletContext<Note>();
}
export default NoteLayout;
