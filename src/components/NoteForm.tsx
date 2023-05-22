import { FormEvent, useContext, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuid } from "uuid";
import { NoteContext } from "../NoteContext";
import { Note, NoteContextType, Tag } from "../types";

type NoteFormProps = Partial<Note>;

const NoteForm = ({
  id = "",
  title = "",
  tags: tagsArr = [],
  markdown = "",
}: NoteFormProps) => {
  const { saveNote, tags, addTag,onUpdateNote } = useContext(NoteContext) as NoteContextType;
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tagsArr);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!id)
      saveNote({
        title: titleRef.current.value,
        markdown: markdownRef.current.value,
        tags: selectedTags,
      });
    else {
      onUpdateNote(id,{
        title: titleRef.current.value,
        markdown: markdownRef.current.value,
        tags: selectedTags,
      })
    }
    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              defaultValue={title}
              required
              type="text"
              ref={titleRef}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="tags">
            <Form.Label>Tags</Form.Label>
            <CreatableReactSelect
              isMulti
              options={tags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onCreateOption={(label) => {
                const newTag: Tag = { id: uuid(), label };
                addTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              styles={{
                multiValueLabel: (styles) => ({
                  ...styles,
                  color: "blue",
                }),
                control: (styles) => ({
                  ...styles,
                  color: "blue",
                }),
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="markdown">
        <Form.Label>Body</Form.Label>
        <Form.Control
          defaultValue={markdown}
          required
          ref={markdownRef}
          as="textarea"
          rows={15}
        />
      </Form.Group>

      <Stack className="justify-content-end" gap={3} direction="horizontal">
        <Button size="lg" variant="primary" type="submit">
          Save
        </Button>
        <Link to="/">
          <Button size="lg" variant="outline-secondary" type="button">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Form>
  );
};

export default NoteForm;
