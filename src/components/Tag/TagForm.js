import React, { useState } from "react";
import { Form } from "semantic-ui-react";

export default function TagForm({ addTag }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTag(value);
    setValue("");
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Input
            fluid
            placeholder="Add a Tag"
            required
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )
}
