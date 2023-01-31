import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Form className="d-flex w-50 me-5">
      <FormControl type="text" placeholder="Search" />
      <Button variant="secondary" className="ms-2">
        Search
      </Button>
    </Form>
  );
}
