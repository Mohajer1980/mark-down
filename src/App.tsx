import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./pages/NewNote";
import './App.css';
import NoteList from "./pages/NoteList";
import NoteLayout from "./pages/NoteLayout";
import { Note } from "./pages/Note";
import EditNote from "./pages/EditNote";


function App() {
  

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id" element={<NoteLayout />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
