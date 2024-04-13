import './style.css';
import {project} from "./project.js";

class items{
 constructor(title,description,dueDate,priority){
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
 }
}

let example = new items("code","code react","1-20-2020","high");
let example2 = new items("code2","code react2","1-20-2020","high");


//later on figure out on how to store the todos
let projectHolder = {}
let todoHolder = []

function outputTodos(items,index){ //does not createTodos but outputs it to our html file
 const inboxContainer = document.getElementsByClassName("inbox-container");
 const todoContainer = document.createElement("div");
 const checkerBtn = document.createElement("button");
 const deleteBtn = document.createElement("button");

 checkerBtn.setAttribute("id","checkerBtn");
 todoContainer.setAttribute("class","todoContainer");
 deleteBtn.setAttribute("id","checkerBtn");

 let todoTitle = items.title;
 let todoDescription = items.description;
 let todoDueDate = items.dueDate;

 //creates div for each item for css styling
 const todoItem1 = document.createElement("div");
 todoItem1.textContent = todoTitle;
 const todoItem2 = document.createElement("div");
 todoItem2.textContent = todoDescription;
 const todoItem3 = document.createElement("div");
 todoItem3.textContent = todoDueDate;

 
 todoContainer.appendChild(checkerBtn);
 todoContainer.appendChild(todoItem1);
 todoContainer.appendChild(todoItem2);
 todoContainer.appendChild(todoItem3);
 todoContainer.appendChild(deleteBtn);
 inboxContainer[index].appendChild(todoContainer);
 todoChecker(checkerBtn,todoItem1,todoItem2,todoItem3);
 deleteTodo(deleteBtn,todoContainer);

}

function createTodos(){ //uses dialog we made to create todos
 const showCreateTodo = document.querySelector("#showCreateTodo");
 const dialogTodo = document.querySelector("#createTodo");
 const createBtn = document.querySelector("#createBtn");

 showCreateTodo.addEventListener("click",()=>{
  dialogTodo.showModal();
 });
 createBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  let valueTitle = dialogTodo.querySelector("#title").value;
  let valueDesc = dialogTodo.querySelector("#description").value;
  let valueDuedate = dialogTodo.querySelector("#dueDate").value;
  let valuePrio = dialogTodo.querySelector("#priority").value;
  let newTodo = new items(valueTitle,valueDesc,valueDuedate,valuePrio);
  todoHolder.push(newTodo);
  console.log(todoHolder);
  projectHolder[i] = todoHolder; //holds the array for storage
  console.log(projectHolder);

  outputTodos(newTodo,index); //how to get the correct index to output this on a page
  populateStorage();

 });
}

function todoChecker(checkerBtn,todoItem1,todoItem2,todoItem3){
 checkerBtn.addEventListener("click",()=>{
  if(todoItem1.style.textDecoration === ""){
   todoItem1.style.textDecoration = "line-through";
   todoItem2.style.textDecoration = "line-through";
   todoItem3.style.textDecoration = "line-through";
  }
  else{
    todoItem1.style.textDecoration = "";
    todoItem2.style.textDecoration = "";
    todoItem3.style.textDecoration = "";
  }
 });
}

function deleteTodo(deleteBtn,todoContainer){
 deleteBtn.addEventListener("click",()=>{
  todoContainer.remove();
 });
}

let i = 0;
function createProject(){
 const projectsContainer = document.querySelector(".projects");
 const btnProjects = document.querySelector("#btnProjects");
 const showProjectsDialog = document.querySelector("#createProject");

 btnProjects.addEventListener("click",()=>{
  showProjectsDialog.showModal();
 })



 const createProjectBtn = showProjectsDialog.querySelector("#createProjectBtn");
 createProjectBtn.addEventListener("click",(event)=>{
  i++;
  project(i); //creates todo page
  event.preventDefault(); 
  let projectTitle = showProjectsDialog.querySelector("#projectTitle").value;
  let projectDiv = document.createElement("button");
  projectDiv.textContent = projectTitle;
  projectDiv.setAttribute("class","projectDiv");
  projectsContainer.append(projectDiv);

 });
}

let index = 0;

function switchProject() {
  const container = document.querySelector('.container'); // Parent container where projectDivs will be added

  // Listen for click events on the container
  container.addEventListener('click', (event) => {
    // Check if the clicked element is a projectDiv
    if (event.target.classList.contains('projectDiv')) {
      index = Array.from(container.getElementsByClassName('projectDiv')).indexOf(event.target);
      const testDivs = document.getElementsByClassName('inbox-container');
      
      // Hide all testDivs initially
      for (let div of testDivs) {
        div.style.display = 'none';
      }

      // Display only the corresponding testDiv
      if (testDivs[index]) {
        testDivs[index].style.display = 'block';
      }
    }
  });
}

//first step figure out how to save the dynamically created items in the object/arr

//create function that saves data to local storage
function populateStorage(){
  const serializedData = JSON.stringify(projectHolder); //changes object into string
  localStorage.setItem('userData', serializedData); //stores it in storage
  console.log(serializedData);
}

//create function that finds data from local storage
function getStorage(){
  const storedData = localStorage.getItem('userData');
  const userData = JSON.parse(storedData);
  let valTitle;
  let valDD;
  let valDesc;
  let prio;
  i++;

  project(i);
  const projectsContainer = document.querySelector(".projects");

  let projectTitle = "stored project";
  //console.log(projectTitle);
  let projectDiv = document.createElement("button");
  projectDiv.textContent = projectTitle;
  projectDiv.setAttribute("class","projectDiv");
  projectsContainer.append(projectDiv);

  for(const key in userData){
    console.log("key: ",key);
    const value = userData[key];
    for(let j = 0 ; j < value.length;j++){
      valTitle = value[j].title;
      valDesc = value[j].description;
      valDD = value[j].dueDate;
      prio = value[j].priority;
      revampUI(i,valTitle,valDesc,valDD,prio);
    }
  }


}

function revampUI(key,title,description,dueDate,priority){
  //todos
  let valueTitle = title;
  let valueDesc = description;
  let valueDuedate = dueDate;
  let valuePrio = priority;
  let newTodo = new items(valueTitle,valueDesc,valueDuedate,valuePrio);
  outputTodos(newTodo,key);
}

outputTodos(example,index);
outputTodos(example2,index);
createTodos();
createProject();
switchProject();
getStorage();
