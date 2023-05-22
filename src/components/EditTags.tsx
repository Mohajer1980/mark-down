import { Col, Form, Modal, Row, Stack,Button } from "react-bootstrap";
import {useContext} from 'react';
import { NoteContext } from "../NoteContext";
import { NoteContextType } from "../types";

type EditTagsProps={
    show: boolean,
    handleClose:()=>void,
    
}

const EditTags = ({show,handleClose}:EditTagsProps) => {
    const {tags,onDeleteTag,onUpdateTag}=useContext(NoteContext) as NoteContextType
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><h1>Edit Tags</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {tags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={(e) => onUpdateTag(tag.id,e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => onDeleteTag(tag.id)}
                    variant="outline-danger"
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTags;
