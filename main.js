let $todoInput;
let $alertInfo;
let $addBtn;
let $ulList;
let $newTask;

let $popUp;
let $popUpInfo;
let $editedTodo;
let $popUpInput;
let $addPopUpBtn;
let $closeTodoBtn;
let $idNumber=0;
let $allTasks;


const main=()=>{
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements =()=>{
$todoInput = document.querySelector('.todoInput');
$alertInfo = document.querySelector('.alertInfo');
$addBtn = document.querySelector('.addBtn');
$ulList = document.querySelector('.todoList ul');
$popUp = document.querySelector('.popup');
$popUpInfo = document.querySelector('.popupInfo');
$popUpInput = document.querySelector('.popupInput')
$addPopUpBtn = document.querySelector('.accept');
$closeTodoBtn = document.querySelector('.cancel');
$allTasks = $ulList.getElementsByTagName('li')
};

const prepareDOMEvents = ()=>{
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopUpBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};


const addNewTask = () =>{
    if($todoInput.value !== ''){
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerHTML=$todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        createToolsArea();
        $todoInput.value='';
        $alertInfo.innerHTML='';
    }else{
        $alertInfo.innerHTML='Wpisz treść zadania!'
    }
}

const enterCheck = (event) => {
    if(event.keyCode === 13){
        addNewTask();
    }
}


const createToolsArea=()=>{
 const toolsPanel = document.createElement('div');
 toolsPanel.classList.add('tools');

 const completeBtn = document.createElement('button');
 completeBtn.classList.add('complete');
 completeBtn.innerHTML='<i class="fas fa-check"></i>';

 const editBtn = document.createElement('button');
 editBtn.classList.add('edit');
 editBtn.innerText='EDIT';

 const deleteBtn = document.createElement('button');
 deleteBtn.classList.add('delete');
 deleteBtn.innerHTML='<i class="fas fa-times"></i>';

 toolsPanel.appendChild(completeBtn);
 toolsPanel.appendChild(editBtn);
 toolsPanel.appendChild(deleteBtn);
 $newTask.appendChild(toolsPanel);
}

const checkClick=(e)=>{
    if(e.target.closest('button').classList.contains('complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    } else if(e.target.closest('button').className === 'edit'){
        editTask(e);
} else if(e.target.closest('button').className === 'delete'){
    deleteTask(e);
}}

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popUpInput.value = $editedTodo.firstChild.textContent;
    $popUp.style.display = 'flex';
}

const changeTodo = () => {
    if($popUpInput.value !== ''){
        $editedTodo.firstChild.textContent = $popUpInput.value;
        $popUp.style.display = 'none';
        $popUpInfo.innerText ='';
    }else{
        $popUpInfo.innerText ='Musisz podać jakąś treść!'
    } 
}

const closePopup = () =>{
    $popUp.style.display= 'none';
}

const deleteTask = (e) =>{
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if($allTasks.length==0){
        $alertInfo.innerText='Brak zadań na liście'
    }
}

document.addEventListener('DOMContentLoaded', main);