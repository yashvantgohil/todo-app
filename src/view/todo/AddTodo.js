import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function AddTodo({ onAddItem }) {
  const [desc, setDesc] = useState("");
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          id="outlined-required"
          label="Add new item"
        />
        <Button disabled={!desc} onClick={() => onAddItem(desc)}>
          <AddIcon style={{ fontSize: "3rem" }} />
        </Button>
      </div>
    </>
  );
}
