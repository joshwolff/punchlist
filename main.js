const taskForm = document.querySelector(".form");
const taskInput = document.querySelector(".form__input");
const taskList = document.querySelector(".tasks__list");

function createTaskItem() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Create task as list item
    const taskHTML = `<div class="item-checkbox"><img src="./assets/images/unchecked.svg" alt="Task completed" /></div><div class="item-text">${taskText}</div><div class="item-controls"><div class="item-delete"><img src="./assets/images/delete.svg" alt="Delete task item" /></div><div class="item-edit"><img src="./assets/images/edit.svg" alt="Edit task item" /></div></div>`;
    const taskItem = document.createElement("li");
    taskItem.classList.add("tasks__list-item");
    taskItem.innerHTML = taskHTML;
    taskList.appendChild(taskItem);

    // Add event listeners to each task created
    taskItem.addEventListener("click", deleteItem);
    taskItem.addEventListener("click", editItem);
    taskItem.addEventListener("click", completeItem);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  createTaskItem();

  taskInput.value = "";
}

taskForm.addEventListener("submit", handleSubmit);

const deleteItem = (e) => {
  const item = e.currentTarget;

  if (e.target.parentNode.className === "item-delete") {
    item.remove();
  }
};

const makeEditable = (itemText) => {
  // Set task text to editable and give focus
  itemText.setAttribute("contenteditable", "true");
  itemText.focus();

  // Prevent new line on enter / return key press
  itemText.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      itemText.removeAttribute("contenteditable");
      itemText.blur();
    }
  });
};

const editItem = (e) => {
  const img = e.target;
  const item = e.currentTarget;
  const itemText = item.querySelector(".item-text");
  const imgParent = img.parentNode;

  if (imgParent.className === "item-edit") {
    makeEditable(itemText);
  }
  // Enable edit on task text double-click
  itemText.addEventListener("dblclick", () => {
    makeEditable(itemText);
  });
};

const completeItem = (e) => {
  const img = e.target;
  const item = e.currentTarget;
  const itemText = item.querySelector(".item-text");
  const imgParent = img.parentNode;
  const uncheckedImg = "./assets/images/unchecked.svg";
  const checkedImg = "./assets/images/checked.svg";

  if (imgParent.className === "item-checkbox") {
    // Add strikethrough when task marked complete
    itemText.classList.toggle("complete");
    // Change checkbox to checked when task completed
    img.setAttribute(
      "src",
      img.getAttribute("src") === uncheckedImg ? checkedImg : uncheckedImg
    );
  }
};
