import React from 'react'
import NoteForm from '../components/NoteForm'
import { useNote } from './NoteLayout'

const EditNote = () => {
    const note=useNote();
    
  return (
    <>
    <h1 className="mb-4">Edit Note</h1>
    <NoteForm
      id={note.id}  
      title={note.title}
      markdown={note.markdown}
      tags={note.tags}
    />
  </>
  )
}

export default EditNote