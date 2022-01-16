import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import EditIcon from "@mui/icons-material/Edit";

import "./Todo.css";

import axios from "axios";
function Todo() {
  const api = "http://localhost:5000/api/v1/todos";
  const [todos, setTodos] = useState({
    title: "",
  });
  const { title } = todos;

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get(api);

      console.log(response);
      setTodos(response.data);
      console.log("ei", todos);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setTodos({ ...todos, [e.target.name]: e.target.value });
  };

  const onSubmitChange = async (event) => {
    event.preventDefault();
    const saveData = await axios.post(api, { ...todos });
    getTodos();

    console.log(saveData);
  };
  const editTodo = async (id) => {
    const editedData = await axios.put(
      `http://localhost:5000/api/v1/todos/${id}`,
      { ...todos }
    );
    getTodos();
    console.log(editedData);
  };
  const deleteTodo = async (id) => {
    console.log(id.target);
    const deletedTodo = await axios.delete(
      `http://localhost:5000/api/v1/todos/${id}`
    );
    console.log(deletedTodo);
    getTodos();
  };
  return (
    <Grid container sx={{ color: "text.primary" }}>
      <div className="todo">
        <p className="text">Todo</p>
        <div>
          <hr />
        </div>
        <div>
          <form action="" className="form" onSubmit={onSubmitChange}>
            <div>
              <label htmlFor="text" className="label">
                Title :{" "}
              </label>
              <input
                type="text"
                className="input"
                // placeholder="Title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
          </form>

          <div>
            {todos.todos &&
              todos.todos.map((todo, index) => {
                return (
                  <List className="list">
                    {
                      <ListItem
                        secondaryAction={
                          <Grid>
                            <IconButton edge="end" aria-label="delete">
                              <EditIcon
                                className="editIcon"
                                onClick={() => editTodo(todo._id)}
                              />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete">
                              <DeleteIcon
                                className="deleteIcon"
                                onClick={() => deleteTodo(todo._id)}
                              />
                            </IconButton>
                          </Grid>

                          // <IconButton edge="end" aria-label="edit">
                          //   <EditIcon />
                          // </IconButton>
                        }
                      >
                        {todo.title}
                      </ListItem>
                    }
                  </List>
                  // <li className="list" key={index}>
                  //   {todo.title}
                  //   <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                  // </li>
                );
              })}
          </div>
          <div className="container">
            <div>
              <Fab color="primary" aria-label="add">
                <AddIcon onClick={onSubmitChange} />
              </Fab>
              {/* <button type="button" >
              +
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default Todo;
