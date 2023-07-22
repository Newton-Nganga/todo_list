import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";


function UpdateModal({ setToggleModal, id }) {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed:false,
  });

  useEffect(() => {
    axios.get(`/api/todos/${id}/`).then((res) => setTodo(res.data)).catch(err=>console.log(err))
  }, [id]);

 const handleChange = (event) => {
    const { name, value } = event.target;
    setTodo((prevToDo) => {
      return { ...prevToDo, [name]: value };
    });
  }; 

  const handleCheck =()=>{
    setTodo(prevToDo=>{
      return{...prevToDo,completed: !todo.completed}
    })
  }
  
  
  const handleUpdate = () => {
    //handle form submision
    axios.put(`/api/todos/${id}/`, todo).then((res) => {
      if (res.status === 200) setToggleModal({
        state: false,
        modal: "",
        id: null,
      });
    });
  };
  //console.log("update",todo)
  return (
    <Modal setToggleModal={setToggleModal}>
      <div className="modal-fields">
        <label className="field-label">Title</label>
        <input
          type="text"
          name="title"
          className="field-input"
          onChange={handleChange}
          value={todo.title}
        />
      </div>
      <div className="modal-fields">
        <label className="field-label">Description</label>
        <textarea
          className="field-input"
          name="description"
          rows={10}
          onChange={handleChange}
          value={todo.description}
        />
      </div>
      <div className="modal-fields check-field">
        <input
          type="checkbox"
          name="completed"
          className="field-input check"
          onChange={handleCheck}
          value={todo.completed}
          checked={todo.completed}
        />
        <span className="field-label">completed</span>
      </div>
      <button
        className="btn-update"
        onClick={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        Update
      </button>
    </Modal>
  );
}

export default UpdateModal;
