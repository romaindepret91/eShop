import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Form>
      <FormControl type="text" placeholder="Search" />
      <Button variant="secondary" className="ms-2">
        Search
      </Button>
    </Form>
  );
}
