export type Note={
    id:string
}& NoteData

export type NoteData={
    title:string,
    markdown:string,
    tags:Tag[]
}
export type Tag={
    id:string,
    label:string
}
export type RawNote={
    id:string
    
}& RawNoteData
export type RawNoteData={
    title:string,
    markdown:string,
    tagIds:string[]
}
export type NoteContextType={
    tags:Tag[],
    saveNote:(note:NoteData) => void,
    addTag:(tag:Tag) => void,
    notesWithTags:Note[],
    onDeleteTag:(id:string)=>void,
    onUpdateTag:(id:string,label:string)=>void,
    onDeleteNote:(id:string)=>void,
    onUpdateNote:(id:string,note:Note)=>void
}
