import "./App.css";
import{use, useState} from 'react'

const App = () =>{

  const[notes,setNotes] = useState([{
    id:1,
    title:"note tittle 1",
    content:"content1"
  },
  {
    id:2,
    title:"note tittle 2",
    content:"content2"
  },
  ]);

  const[title, setTitle] = useState();
  const[content,setContent] = useState();
  const[selectedNote,setSelectedNote] = useState(null);

  const handleNoteClick = (note) =>{
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);

  }

  const handleAddNote = (e)=> {
    e.preventDefault();

    const newNote = {
      id:notes.length+1,
      title:title,
      content:content
    }
    setNotes([newNote,...notes]);
    setTitle("");
    setContent("");
  }

  const handleUpdate = (e) =>{

    e.preventDefault();

    if(!selectedNote){
      return;
    }
    const updateNote = {
      id:selectedNote.id,
      title: title,
      content:content
    }
    
    const updatedNotesList = notes.map((note)=>
    selectedNote.id === note.id ? updateNote:note)
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null)
  }

  const handleCancel = () =>{
    setSelectedNote(null);
    setTitle("");
    setContent("");
  }

  const deleteNote = (e,noteId)=>{
    e.stopPropagation();

    const updatedNotes = notes.filter((note)=>
    note.id !== noteId)
    setNotes(updatedNotes);
  }


  return (
    <div className = "app-container">
      <form className="notes-form" onSubmit={(e)=> selectedNote?handleUpdate(e):handleAddNote(e)}>
        <input placeholder = "title"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        required/>
        <textarea 
        placeholder="content"
        value={content}
        onChange={(e)=> setContent(e.target.value)}
        required
        rows={10}/>
        {selectedNote ?(<div className="edit-button">
          <button type = "submit">Save</button>
          <button type="submit" onClick={handleCancel}>Cancel</button>

        </div>):( <button type="submit" >Add Note </button>)}
       
      </form>
      <div className="notes-grid">
        {notes.map((note)=>
        <div className="note-item" key={note.id} onClick={()=>handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(e)=>deleteNote(e,note.id)}>X</button>
          </div>
          <h2> {note.title}</h2>
          <p>{note.content}</p>
        </div>
        )}
      </div>
    </div>
  )
}

export default App;