import "./App.css";
import { useEffect, useState } from "react";
import AddItemModal from "./components/AddItemModal";
import ItemModal from "./components/ItemModal";
import UpdateModal from "./components/UpdateModal";
import { FcPlanner } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import axios  from "axios";

function App() {
  const [todos,setTodos]=useState(null)
  const [toggleModal, setToggleModal] = useState({
    state: false,
    modal: "",
    id: null,
  });
  const handleModal = (e, modalType, itemId) => {
    e.preventDefault();
    //console.log(modalType);
    if (modalType === "add-item") {
      setToggleModal({ state: true, modal: "add-item", id: itemId });
    }
    if (modalType === "item") {
      setToggleModal({ state: true, modal: "item", id: itemId });
    }
    if (modalType === "update-item") {
      setToggleModal({ state: true, modal: "update-item", id: itemId });
    }
  };

  const handleDelete=(id)=>{
    axios.delete(`/api/todos/${id}`)
    .then(res=>{
      if (res.status === 204) setToggleModal({
      state: false,
      modal: "",
      id: null,
    })})
  }

  useEffect(()=>{
    axios.get("/api/todos")
    .then(response=>{setTodos(response.data)})
  },[toggleModal])
  //console.log(todos)
  return (
    <section className="body-segment">
      <h1 className="header">Todo Organizer</h1>
      <div className="todo-fixed">
        <div className="todo-el">
          <ul className="todo-items">
            {todos?.map(({id,title,description,completed})=>{
              return(
             <li  key={id}
             
              className={`${
                completed ? "isCompleted" : "isIncomplete"
              } li-item w-full `}
            >
              <button
                className="item-comp w-full"
                onClick={(e) => handleModal(e, "item", id)}
              >
                <span className="it-btn mark">
                  <FcPlanner />
                </span>
                <p className="item-title w-full">{title}</p>
                <span
                  className=""
                  style={
                    completed ? { color: "#4eb84e" } : { color: "#cc3939" }
                  }
                >
                  {completed ? "completed" : "incomplete"}
                </span>
              </button>
              <button
                className="it-btn edit"
                onClick={(e) => handleModal(e, "update-item", id)}
              >
                <AiOutlineEdit/>
              </button>
              <button className="it-btn del" onClick={e=>{e.preventDefault();handleDelete(id)}}><MdDeleteOutline/></button>
            </li>
            )})}
            
          </ul>
        </div>
        <p className="btn-wrapper">
          {" "}
          <button
            className="btn-add"
            onClick={(e) => handleModal(e, "add-item", null)}
          >
            +
          </button>{" "}
        </p>
      </div>

      {toggleModal.state && toggleModal.modal === "add-item" && (
        <AddItemModal setToggleModal={setToggleModal} />
      )}
      {toggleModal.state && toggleModal.modal === "item" && (
        <ItemModal setToggleModal={setToggleModal} id={toggleModal.id}/>
      )}
      {toggleModal.state && toggleModal.modal === "update-item" && (
        <UpdateModal setToggleModal={setToggleModal} id={toggleModal.id}/>
      )}
    </section>
  );
}

export default App;
