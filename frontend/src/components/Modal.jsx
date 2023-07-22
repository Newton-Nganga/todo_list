import { AiOutlineCloseCircle } from "react-icons/ai";

function Modal({setToggleModal,children}) {
  //console.log(children)
  return (
    <section className='modal-area'>
        <p>
            <button className='btn-close' onClick={(e)=>{
            e.preventDefault();
            setToggleModal({state:false,modal:"",id:''})
        }}><AiOutlineCloseCircle/></button></p>
       <div className='modal-container'>
        {children}
       </div>
    </section>
  )
}

export default Modal