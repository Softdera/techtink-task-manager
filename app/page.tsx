
"use client";
import { useState, useEffect } from "react";
import { Container, Typography, List, Box } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import SearchForm from "./components/SearchForm";
import SearchItem from "./components/SearchItem";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setCompletedTasks(tasks.filter(task => task.completed));
  }, [tasks]);

  const addTask = (taskText: string) => {
    const newTask = { id: Date.now(), text: taskText, completed: false, completedAt: null };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null }
          : task
      )
    );
  };

  const editTask = (taskId: number) => {
    const newText = prompt("Edit task");
    if (newText) {
      setTasks(
        tasks.map(task =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      );
    }
  };

  const undoTask = (taskId: number) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: false, completedAt: null } : task
      )
    );
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const filteredCompletedTasks = completedTasks.filter(task =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "80vh",
        paddingTop: "50px",
      }}
    >
      {/* Pending Tasks Section */}
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Pending Tasks
        </Typography>
        <Box
          sx={{
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <TaskForm onAdd={addTask} />
          <List>
            {pendingTasks.length > 0 ? (
              pendingTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onComplete={toggleComplete}
                  onEdit={editTask}
                />
              ))
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                No pending tasks
              </Typography>
            )}
          </List>
        </Box>
      </Container>

      {/* Completed Tasks Section */}
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Completed Tasks
        </Typography>
        <Box
          sx={{
            backgroundColor: "#FFE9E4",
            minHeight: "80vh",
            padding: "20px",
          }}
        >
          <SearchForm searchQuery={searchQuery} onSearch={setSearchQuery} />
          <List>
            {filteredCompletedTasks.length > 0 ? (
              filteredCompletedTasks.map(task => (
                <SearchItem
                  key={task.id}
                  task={task}
                  onEdit={editTask}
                  onUndo={undoTask}
                />
              ))
            ) : (
              <Typography variant="body1" align="center" color="textSecondary">
                No completed tasks
              </Typography>
            )}
          </List>
        </Box>
      </Container>
    </Box>
  );
}
