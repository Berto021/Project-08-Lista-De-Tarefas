const inputNewTask = document.querySelector('.input-new-task');
const buttonAddTask = document. querySelector('.button-add-task');
const tasks = document.querySelector('.task');

inputNewTask.addEventListener('keypress', function(evento){
    if(evento.keyCode === 13){
        if(!inputNewTask.value) return;
        createTask(inputNewTask.value);
        
        
    }
})

function saveTasks(){
    const liTasks = tasks.querySelectorAll('li')  
    const listTasks = [];

    for(let task of liTasks){
        let taskText = task.innerText.replace('Apagar','').trim()
        listTasks.push(taskText);
    
    }
   const taskJSON = JSON.stringify(listTasks);
   localStorage.setItem('tarefas', taskJSON);
}


function CreateButtonAndDeleteButton(li){
    li.innerText += '   '
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Apagar'
    deleteButton.setAttribute('class','erase')
    deleteButton.setAttribute('title','apagar esta tarefa')
    li.appendChild(deleteButton);

}

function clearTaskInput(){
    inputNewTask.value = ''
    inputNewTask.focus(); // serve para dar o foco, nesse caso é no input
}

function createLi(){
    const li =document.createElement('li');
    return li;
}
function createTask(textInput) {
    const li = createLi();
    li.innerHTML = textInput
    tasks.appendChild(li);
    clearTaskInput(); 
    CreateButtonAndDeleteButton(li);
    saveTasks();
   
}
function addTaskSaves(){
    const tasks = localStorage.getItem('tarefas')
    const listTasks = JSON.parse(tasks)

    for (let task of  listTasks){
        createTask(task);
    }
}
addTaskSaves();

buttonAddTask.addEventListener('click', function(){
    if(!inputNewTask.value) return;
    createTask(inputNewTask.value);
})
document.addEventListener('click', function(event){
    const element = event.target;

    if (element.classList.contains('erase')){
        element.parentElement.remove()
    saveTasks()
    }
})