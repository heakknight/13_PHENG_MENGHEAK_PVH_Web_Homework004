const displayContent = document.getElementById('container');
const dialog = document.getElementById("formDialog");
const openFormAdd = document.getElementById("addTask");
const closeFormAdd = document.getElementById("closeDialog");


const listHomework = [
  {id:1,task:'Web Homework',priority:"High",status:'Progress'},
  {id:2,task:'Java Homework',priority:"Low",status:'To Do'}
];

let length = listHomework.length;
let editingTaskId = null;

const submitTask = document.getElementById('submitTask');
const task = document.getElementById("taskInput");

openFormAdd.addEventListener("click", () => {
  dialog.showModal();
});

closeFormAdd.addEventListener('click', () => {
  editingTaskId = null;
  dialog.close();
  submitTask.innerHTML = "Add"; 
  taskForm.reset(); 
  cancelTask.style.display = "none";
});

submitTask.addEventListener('click', (e) => {
  submitTask.innerHTML = 'Add';
  e.preventDefault();
  const priority = document.querySelector('input[name="priority"]:checked');
  const status = document.querySelector('input[name="status"]:checked');

  if(!task.value){
    alert("please input tasks")
    return;
  }
  if(!priority){
    alert("please select priority!")
    return;
  }
  if(!status){
    alert("Please select status!")
    return
  }

  if(editingTaskId !== null){
    const taskToUpdate = listHomework.find(item => item.id === editingTaskId);
    taskToUpdate.task = task.value;
    taskToUpdate.priority = priority.value;
    taskToUpdate.status = status.value;
    editingTaskId = null;
  }else{
    const newTask = {
      id: length = length + 1,
      task: task.value,
      priority: priority.value,
      status: status.value
    }
    listHomework.push(newTask);
  }
  
  submitTask.innerHTML = "Add";
  displayTask();  
  taskForm.reset();
  dialog.close();
});

function displayTask(){
  displayContent.innerHTML = "";

  listHomework.forEach((item) => {
  let textColor = "";
  if (item.priority === "High"){
    textColor = "text-red-500";
  }else if (item.priority === "Medium"){
    textColor = "text-amber-500";
  }else if (item.priority === "Low"){
    textColor = "text-green-500";
  }

  displayContent.innerHTML += `
     <div class="bg-white rounded-[5px] flex justify-between p-5 pl-10 pr-15 mt-5 mb-5">
      <span class="inline-block w-1/5 font-bold text-[17px]">${item.task}</span>
      <span class="${textColor} font-black text-[17px]">${item.priority}</span>
      <span class="font-black text-[17px]">${item.status}</span>
      <span class="text-amber-400 font-black text-[17px] flex gap-2">
        <button onclick="updateTask(${item.id})" class="text-purple-500 cursor-pointer"><i class="fa-solid fa-pen-to-square"></i></button>
        <button onclick="deleteTask(${item.id})" class="text-red-500 cursor-pointer">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </span>
    </div>`
  });
}

const confirmDialog = document.getElementById('confirmDialog');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');

let taskIdToDelete = null;
function deleteTask(id){
  taskIdToDelete = id;
  confirmDialog.showModal();

  confirmYes.addEventListener("click", () => {
    const index = listHomework.findIndex(item => item.id === taskIdToDelete);
    if(index !== -1){
      listHomework.splice(index,1);
    }
    confirmDialog.close();
    displayTask();
    taskIdToDelete = null;
  });
  confirmNo.addEventListener('click', () => {
    taskIdToDelete = null;
    confirmDialog.close();
  });
}

function updateTask(id){
  const taskToEdit = listHomework.find(item => item.id === id);
  editingTaskId = id;
  if(editingTaskId){
    submitTask.innerHTML = 'Update';
  } else{
    submitTask.innerHTML = 'Add';
  }
  cancelTask.style.display = "inline-block"
  task.value = taskToEdit.task;
  document.querySelector(`input[name="priority"][value="${taskToEdit.priority}"]`).checked = true;
  document.querySelector(`input[name="status"][value="${taskToEdit.status}"]`).checked = true;
  dialog.showModal();
}

const cancelTask = document.getElementById("cancelTask");
cancelTask.style.display = "none";

cancelTask.addEventListener("click", () => {
  editingTaskId = null;
  submitTask.innerHTML = "Add";
  taskForm.reset();
  dialog.close();
  cancelTask.style.display = "none";
});

displayTask();