//getting access to the elements by their ids
const container = document.querySelector(".container");
const inputValue = document.querySelector(".input");
const add = document.querySelector(".add");

if (window.localStorage.getItem("todoItems") == undefined) {
  //an array to store all todo task
  let todoItems = [];
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  localStorage.setItem("id", 1);
}

let todo = window.localStorage.getItem("todoItems");
let todoItems = JSON.parse(todo);

class TodoItem {
  constructor(id, description) {
    if (id === null && description === null) {
      this.id = null;
      this.description = null;
    } else {
      this.id = id;
      this.description = description;
    }
  }
}

class TodoList {
  constructor(todoItems = []) {
    if (todoItems === null) {
      this.todoItems = null;
    } else {
      this.addTodoItem(todoItems);
    }
  }

  //adds new item to the array
  addTodoItem(name) {
    let itemBox = document.createElement("li");
    itemBox.classList.add("item");

    let input = document.createElement("textarea");
    // input.type = "text";
    input.disabled = true;
    input.value = name;
    input.classList.add("item_input");

    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "UPDATE";
    edit.addEventListener("click", () => this.updateTodoItem(input, name));

    let remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = "DELETE";
    remove.addEventListener("click", () => this.deleteTodoItem(itemBox, name));

    container.appendChild(itemBox);
    itemBox.appendChild(input);
    itemBox.appendChild(edit);
    itemBox.appendChild(remove);
  }

  //updates the selected item on the array of items
  updateTodoItem(input, name) {
    if (input.disabled == true) {
      input.disabled = !input.disabled;
    } else {
      document.querySelector(".item_input").focus();
      input.disabled = !input.disabled;
      let indexof = todoItems.indexOf(name);
      todoItems[indexof] = input.value;
      window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
    }
  }
    //deletes the items on the array
   deleteTodoItem(itemBox, name) {
    itemBox.parentNode.removeChild(itemBox);
    let index = todoItems.indexOf(name);
    todoItems.splice(index, 1);
    window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
}

add.addEventListener("click", insertData);
window.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    insertData();
  }
});

function insertData() {
  if (inputValue.value != "") {
    let personId = Number(localStorage.getItem("id"));
    new TodoList(inputValue.value);
    todoItems.push(inputValue.value);
    window.localStorage.setItem("todoItems", JSON.stringify(todoItems));
    personId++;
    localStorage.setItem("id", personId);
    inputValue.value = "";
  }
}

for (let v = 0; v < todoItems.length; v++) {
  new TodoList(todoItems[v]);
}