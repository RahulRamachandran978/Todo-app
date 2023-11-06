import React from "react";
import './Todo.css'
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todo() {
    const [todo, setTodo] = useState();
    const [todos, setTodos] = useState([]);
    const [editId, setEditID] = useState(0);
  
    useEffect(() => {
      // Load todos from localStorage when the component mounts
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      setTodos(storedTodos);
    }, []);
  
    useEffect(() => {
      // Save todos to localStorage whenever todos change
      localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
  
   
    const addTodo = () => {
      if (todo.trim() !== "") {
        const todoLowerCase = todo.toLowerCase();
        const isDuplicate = todos.some(
          (item) => item.list.toLowerCase() === todoLowerCase
        );
  
        if (!isDuplicate) {
          if (editId) {
            const editTodo = todos.find((todo) => todo.id === editId);
            const updateTodo = todos.map((to) =>
              to.id === editTodo.id
                ? (to = { id: to.id, list: todo })
                : (to = { id: to.id, list: to.list })
            );
            setTodos(updateTodo);
            setEditID(0);
            setTodo(" ");
          } else {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
            setTodo("");
          }
          toast.success("Todo added successfully!");
        } else {
          toast.error("Todo already exist");
        }
      } else {
        toast.error("Please enter a non-empty todo.");
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };
  
    const inputRef = useRef("null");
    useEffect(() => {
      inputRef.current.focus();
    });
  
    const onDelete = (id) => {
      try {
        const updatedTodos = todos.filter((to) => to.id !== id);
        //setTodos(todos.filter((todo) => todo.id !== id));
        setTodos(updatedTodos);
        setEditID(0);
        setTodo("");
        toast.success("Todo deleted successfully!");
      } catch (error) {
        toast.error("An error occured while deleting the todo");
      }
    };
  
    const onComplete = (id) => {
      try {
        let complete = todos.map((list) => {
          if (list.id === id) {
            return { ...list, status: !list.status };
          }
          return list;
        });
        setTodos(complete);
        toast.success("Succefully finished  todo");
      } catch (error) {
        toast.error("Could finish Todo");
      }
    };
  
    const onEdit = (id) => {
      try {
        const editTodo = todos.find((to) => to.id === id);
        console.log("editdata" + editTodo.list);
        setTodo(editTodo.list);
        setEditID(editTodo.id);
        toast.info("Editing  todo...");
      } catch (error) {
        toast.error("An error occured while editing toDo");
      }
    };

    return (
        <div className="container">
          <h2>TODO APP</h2>
          <form className="form-group" onSubmit={handleSubmit}>
            <input
              type="text"
              value={todo}
              ref={inputRef}
              placeholder="Enter your todo"
              className="form-control"
              onChange={(event) => setTodo(event.target.value)}
            />
            <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
          </form>
          <div className="list">
            <ul>
              {todos.map((todo) => (
                <li className="list-items">
                  <div
                    className="list-item-list"
                    id={todo.status ? "list-item" : ""}
                  >
                    {todo.list}
                  </div>
                  <span>
                    <IoMdDoneAll
                      className="list-item-icons"
                      id="complete"
                      title="Complete"
                      onClick={() => onComplete(todo.id)}
                    />
                    <FiEdit
                      className="list-item-icons"
                      id="edit"
                      title="Edit"
                      onClick={() => onEdit(todo.id)}
                    />
                    <MdDelete
                      className="list-item-icons"
                      id="delete"
                      title="Delete"
                      onClick={() => onDelete(todo.id)}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </div>
      );
    }

export default Todo