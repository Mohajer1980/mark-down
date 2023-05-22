import { useContext } from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { NoteContext } from "../NoteContext";
import { NoteContextType } from "../types";
import { useNote } from "./NoteLayout";

export function Note() {
  const note = useNote();
  const navigate = useNavigate();
  const { onDeleteNote } = useContext(NoteContext) as NoteContextType;
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags?.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDeleteNote(note.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
