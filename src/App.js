import React from 'react';
import './App.css';
import {useState} from 'react'
import Swal from "sweetalert2";


function App() {
  const [toDos, setToDos] = useState([])
  const [toDo,setTodo] = useState('')


/* -------------------------------------------------------------------------- */
/*                                    Date                                    */
/* -------------------------------------------------------------------------- */

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  const day = dayNames[date.getDay()];

  const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currDate = new Date();
  const hours = currDate.getHours();
  const AMorPM = hours >= 12 ? 'PM' : 'AM';
  var hour = hours % 12;
  const hour12 = () => {
     if (hour === 0) hour = 12;
     return hour;
  };
  const toDoDate = currDate.getDate() + '.' + (currDate.getMonth() + 1) + '.' + currDate.getFullYear();
  const toDoDay = dayNamesShort[currDate.getDay()];
  const toDoTime = hour12() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' ' + AMorPM;
  const toDoTimeDateDay = toDoTime + ' ' + toDoDay + ' ' + toDoDate;

/* -------------------------------------------------------------------------- */
/*                                  Date Ends                                 */
/* -------------------------------------------------------------------------- */



  const handleInputSubmit =(e)=>{
    e.preventDefault();
    if (toDo){
      setToDos([...toDos,{
        id: Date.now(),
        text: toDo,
        toDoTime: toDoTimeDateDay,
        statusErase: false,
        statusDone: false,
        statusDrop: false,
        statusRetrieve: false,
        statusRemove: false
      }])
      setTodo('')
    }
  }

  const handleUserInput =(e)=>{
    setTodo(e.target.value)
  }
  const resetInputField =()=>{
    setTodo('')
  }


  const editToggle = async (id) => {
   const { value: editedTask } = await Swal.fire({
     title: "Rename Task",
     input: "text",
     inputValue:toDos.find((todo)=>todo.id === id).text,
     inputPlaceholder: "Enter Here",
   });

   if (editedTask) {
     let newTodos =toDos.filter((todo) => {
       if (todo.id === id) {
         todo.text = editedTask;
       }
       return todo;
     })
     setToDos(newTodos);

   }
 };
  return (
    <>
    <div className="headings">
            <div className="mainHeading">
               <h1 className="gradient-text">ToDo List</h1>
            </div>
            <div className="subHeading">
               <h2 className="gradient-text2">Hey, it's {day}</h2>
            </div>
         </div>
    <form onSubmit={handleInputSubmit}>
            <div className="toDoInput">
               <div className="left">
                  <input value={toDo} onChange={handleUserInput} type="text" placeholder=" Plan Something . . ." />
               </div>
               <div className="right erase">
                  <i onClick={resetInputField} className="fas fa-eraser" title="Clear"></i>
               </div>
               <div className="rightEnd  add">
                  <button style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }} type="submit"><i className="fas fa-plus" title="Add"></i></button>
               </div>
            </div>
    </form>
    <div className="container done">
            <h3>Done</h3>
            {
               toDos && toDos.map((obj) => {
                  if (obj.statusDone && !obj.statusRemove) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left"></div>
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right bin">
                              <i onClick={(e) => {
                                 let isdelete = window.confirm("Deleting ToDo permanently !");
                                 if (isdelete) {
                                    e.target.value = true;
                                 }
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusRemove = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={
                              () => editToggle(obj.id)}>
                           <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                           </svg>
                           </div>                          
                        </div>
                     );
                  }
               })
            }
         </div>

         <div className="container onGoing">
            <h3>On Going</h3>
            {
               toDos && toDos.map((obj) => {
                  if (!obj.statusDone && !obj.statusDrop) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} 
                              value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDrop} className="fas fa-times" title="Drop"></i>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={
                              () => editToggle(obj.id)}>
                           <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                           </svg>
                           </div>
                        </div>
                     );
                  } else if (obj.statusRetrieve && !obj.statusDone) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {

                                 e.target.value = true;
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                       obj.statusRetrieve = !e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDrop} className="fas fa-times" title="Drop"></i>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={
                              () => editToggle(obj.id)}>
                           <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                           </svg>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

         <div className="container dropped">
            <h3>Dropped</h3>
            {
               toDos && toDos.map((obj) => {
                  if (obj.statusDrop && !obj.statusRetrieve && !obj.statusRemove) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left recycle">
                              <i onClick={(e) => {
                                 let isdelete = window.confirm("Retrieving dropped ToDo");
                                 if (isdelete) {
                                    e.target.value = true;
                                 }
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusRetrieve = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusRetrieve} className="fas fa-redo-alt" title="Retrieve"></i>
                           </div>
                           <div className="top">
                              <p className="textCross">{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toDoTime}</p>
                           </div>
                           <div className="right bin">
                              <i onClick={(e) => {
                                 let isdelete = window.confirm("Deleting ToDo permanently !");
                                 if (isdelete) {
                                    e.target.value = true;
                                 }
                                 setToDos(toDos.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusRemove = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusRemove} className="fas fa-trash-alt" title="Remove"></i>
                           </div>
                        </div>
                     );
                  }
               })
            }
            
         </div>
    </>
  );
}

export default App; 