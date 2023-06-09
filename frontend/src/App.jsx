import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from 'axios';

const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false
  });
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios.get("http://localhost:8000/api/tasks/")
      .then(res => setTaskList(res.data))
      .catch(err => console.log(err));
  };

  const displayCompleted = status => {
    if (status) {
      setViewCompleted(true);
    } else {
      setViewCompleted(false);
    }
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          completed
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = taskList.filter(item => item.completed === viewCompleted);
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = item => {
    toggle();
    if (item.id) {
      axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => refreshList());
      return;
    }
    axios.post("http://localhost:8000/api/tasks/", item)
      .then(res => refreshList());
  };

  const handleDelete = item => {
    axios.delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => refreshList());
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  const editItem = item => {
    setActiveItem(item);
    setModal(!modal);
  };

}
