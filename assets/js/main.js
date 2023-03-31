const inputNewTask = document.querySelector('.input-new-task');
const buttonAddTask = document. querySelector('.button-add-task');// pegando os elementos do html e colocando em variáveis do js
const tasks = document.querySelector('.task');

inputNewTask.addEventListener('keypress', function(evento){ //aqui eu estou falando que quando o keycode for 13(é o enter) ele vai criar uma task também, isso é uma alternativa ao botão, isso é importânte.
    if(evento.keyCode === 13){
        if(!inputNewTask.value) return;
        createTask(inputNewTask.value);
        
        
    }
})

function saveTasks(){
    const liTasks = tasks.querySelectorAll('li')  
    const listTasks = [];

    for(let task of liTasks){
        let taskText = task.innerText.replace('Apagar','').trim() // essa parte eu não entendi muito bem, copiei um pouco do professor, ele ainda não tinha explicado essas coisas, então tá de boas
        listTasks.push(taskText);
    
    }
   const taskJSON = JSON.stringify(listTasks);
   localStorage.setItem('tarefas', taskJSON);
}


function CreateButtonAndDeleteButton(li){
    li.innerText += '   '
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Apagar'                              //Aqui eu crio um o  botão de delete, coloco ele, boto uma classe e um title
    deleteButton.setAttribute('class','erase')
    deleteButton.setAttribute('title','apagar esta tarefa')
    li.appendChild(deleteButton);

}

function clearTaskInput(){
    inputNewTask.value = ''
    inputNewTask.focus(); // serve para dar o foco, nesse caso é no input
}

function createLi(){
    const li =document.createElement('li'); // só criando o li lá no html
    return li;
}
function createTask(textInput) {
    const li = createLi();
    li.innerHTML = textInput       //essa aqui é a função mais importânte
    tasks.appendChild(li);
    clearTaskInput(); 
    CreateButtonAndDeleteButton(li);
    saveTasks();
   
}
function addTaskSaves(){
    const tasks = localStorage.getItem('tarefas') //,mais uma parte que eu não aprendi ainda, mas é bem maneiro, pois armazena as informações no pc, sendo assim quando usuário colocar as tasks vão ficar salvas e quando voltar pra página novamente estarão do mesmo jeito
    const listTasks = JSON.parse(tasks)

    for (let task of  listTasks){
        createTask(task);
    }
}
addTaskSaves();

buttonAddTask.addEventListener('click', function(){//aqui eu to pegando o evento de click do mouse e se for no botão adicionar ele vai adicionar uma task
    if(!inputNewTask.value) return;
    createTask(inputNewTask.value);
})
document.addEventListener('click', function(event){ //aqui eu to pegando o evento de click do mouse e se ele for no botão de apagar vai apagar
    const element = event.target;

    if (element.classList.contains('erase')){
        element.parentElement.remove()
    saveTasks()
    }
})