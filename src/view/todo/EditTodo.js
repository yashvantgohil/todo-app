import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditTodo({ open, onClose, task, onEdit }) {
  const [desc, setDesc] = React.useState(task.description);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          >
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Button
              size="large"
              variant="contained"
              onClick={() => onEdit(desc)}
            >
              Edit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
