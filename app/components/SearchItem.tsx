import React, { useState } from "react";
import { ListItem, IconButton, ListItemText, Typography } from "@mui/material";
import { Undo } from "@mui/icons-material";
import ConfirmationModal from "./ConfirmationModal";

interface SearchItemProps {
  task: any;
  onEdit: (taskId: number) => void;
  onUndo: (taskId: number) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ task, onEdit, onUndo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleUndo = () => {
    onUndo(task.id);
    setModalOpen(false);
  };

  const formattedDate = task.completedAt
    ? new Date(task.completedAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos" })
    : "";

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton edge="end" color="info" onClick={() => onEdit(task.id)}>
              <Undo />
            </IconButton>
            <IconButton edge="end" color="error" onClick={() => setModalOpen(true)}>
              <Undo />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={task.text}
          secondary={
            task.completedAt && (
              <Typography variant="body2" color="textSecondary">
                Completed at: {formattedDate}
              </Typography>
            )
          }
        />
      </ListItem>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleUndo}
      />
    </>
  );
};

export default SearchItem;
