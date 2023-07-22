import { Fragment, useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function ItemModal({ setToggleModal ,id}) {
  const [todo,setTodo] = useState([null])
   useEffect(()=>{
   axios.get(`/api/todos/${id}`)
   .then(res=>setTodo(res.data))
   },[id])
  //  console.log("view to do",todo)
  return (
    <Modal setToggleModal={setToggleModal}>
    
      
      <div className="modal-fields">
        <span className="field-label">Title</span>
        <p className="modal-field-text">{todo?.title}</p>
      </div>
      <div className="modal-fields">
        <span className="field-label">Description</span>
        <p className="modal-field-text">
          {todo?.description}
        </p>
      </div>
      
    </Modal>
  );
}

export default ItemModal;
