import "./style.css";

export function project(i){
 const inbox = document.querySelector(".inbox");
 const createTodoContainer = document.createElement('div');
 createTodoContainer.setAttribute("class","inbox-container");
 
 createTodoContainer.setAttribute("id",i);
 //inbox.removeChild(inbox.lastChild);
 createTodoContainer.style.display = "none";
 inbox.appendChild(createTodoContainer);
}