import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import TagForm from "./TagForm";

export default function Tag() {
  // Hook used to create tag list array
  const [tagList, setTagList] = useState([]);

  const addTag = text => {
    // allows an iterable to expand
    const newTags = [...tagList, { text }];
    setTagList(newTags);
  };

  return (
    <div>
      <div>
        <div >
          {tagList.map((val) => {
            return (
              <>
                <h2><Badge bg="secondary">{val.text}</Badge></h2>

              </>
            )
          })}
        </div>
      </div>
      <TagForm addTag={addTag} />
    </div>
  )
}
