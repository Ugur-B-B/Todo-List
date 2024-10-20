const todoInput = document.querySelector(".todo-input");
const deleteAll = document.getElementById("deleteAll");
const todoList = document.querySelector(".todo_list");
const addBtn = document.getElementById("addBtn");

todoInput.onkeyup = () => {
  const userData = todoInput.value.trim();
  if (userData.length > 0) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
};
showTodos();
addBtn.onclick = () => {
  const userData = todoInput.value.trim();
  if (userData === "") {
    return;
  }
  let getLocalStorage = localStorage.getItem("New Todo");
  let todoArr = [];
  try {
    if (getLocalStorage) {
      todoArr = JSON.parse(getLocalStorage);
    }
  } catch (error) {
    console.log("json.parse error");
    todoArr = [];
  }
  if (!Array.isArray(todoArr)) {
    todoArr = [];
  }
  todoArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(todoArr));

  todoInput.value = "";
  showTodos();
};

function showTodos() {
  let getLocalStorage = localStorage.getItem("New Todo");
  let todoArr = [];
  try {
    if (getLocalStorage) {
      todoArr = JSON.parse(getLocalStorage);
    }
  } catch (error) {
    console.log("json.parse error");
    todoArr = [];
  }
  if (!Array.isArray(todoArr)) {
    todoArr = [];
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = todoArr.length;
  if (todoArr.length > 0) {
    deleteAll.style.display = "block";
  } else {
    deleteAll.style.display = "none";
  }
  let liTag = "";
  todoArr.forEach((element, index) => {
    liTag += `
          <li class="todo_list_item">
            <span>${element}</span>
            <span class="fa-solid fa-trash" id="delete" onclick="deleteTask(${index})" ></span>
          </li>
    `;
  });
  todoList.innerHTML = liTag;
  localStorage.setItem("New Todo", JSON.stringify(todoArr));
}
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  todoArr = JSON.parse(getLocalStorage);
  todoArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(todoArr));
  showTodos();
}
deleteAll.onclick = () => {
  localStorage.removeItem("New Todo");
  showTodos();
};
