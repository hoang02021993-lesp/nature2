import React, { useState } from "react";

export default function ImageUploader() {
  const [files, setFiles] = useState(null);

  function onSubmit(event) {
    event.preventDefault()

    const body = new FormData();

    for (let index = 0; index <= files.length; index++) {
      const element = files[index];
      body.append('file', element)
    }

    fetch("/api/upload", {
      method: "POST",
      body
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" multiple onChange={e => setFiles(e.target.files)}  required/>
      <button type="submit">Submit</button>
    </form>
  );
}