//DOM Elements
const form = document.querySelector("#input-form");
const input = document.querySelector("#todo-input");
const board = document.querySelector("#board");
const todocolumn = document.createElement("div");
const inprogresscolumn = document.createElement("div");
const completedcolumn = document.createElement("div");
todocolumn.classList.add("todo-column");
inprogresscolumn.classList.add("inprogress-column");
completedcolumn.classList.add("completed-column");

//add tasks

function addtask() {
  const title = input.value.trim();
  if (title == "") {
    alert("Please enter a task title");
    return;
  }
  const column = document.querySelector('input[name="column"]:checked').value;

  const tags = [];

  if (document.querySelector("#web").checked) {
    tags.push("web");
  }
  if (document.querySelector("#mobile").checked) {
    tags.push("mobile");
  }
  const priority = document.querySelector(
    'input[name="priority"]:checked',
  ).value;
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const newtask = {
    id: getnextid(),
    priority: priority,
    title: title,
    tags: tags,
    date: date,
    column: column,
  };
  dataset.push(newtask);
  renderBoard();
  form.reset();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addtask();
});

//dataset of tasks(JSON)
const dataset = [
  {
    id: 1,
    priority: "low",
    title:
      "This is task description that will wrap automatically into a new line",
    tags: ["web", "mobile"],
    date: "march 3, 2023",
    column: "todoList",
  },
  {
    id: 2,
    priority: "low",
    title: "Define more tags in components",
    tags: ["web", "mobile"],
    date: "march 3, 2023",
    column: "todoList",
  },
  {
    id: 3,
    priority: "medium",
    title: "add more user avatars",
    tags: ["web", "Mobile"],
    date: "march 3, 2023",
    column: "inprogressList",
  },
  {
    id: 4,
    priority: "low",
    title: "Add 'pinned' section into the board",
    tags: ["web"],
    date: "march 4, 2023",
    column: "inprogressList",
  },
  {
    id: 5,
    priority: "medium",
    title: "add archived state for the card components",
    tags: ["mobile"],
    date: "march 4, 2023",
    column: "inprogressList",
  },
  {
    id: 6,
    priority: "low",
    title: "Add How to Use page to help creators in using this template",
    tags: ["web"],
    date: "march 4, 2023",
    column: "inprogressList",
  },
  {
    id: 7,
    priority: "high",
    title: "Version 1 of Kanban Board Template release",
    tags: ["web", "mobile"],
    date: "march 4, 2023",
    column: "completedList",
  },
];

//helping functions to get tasks by column, get priority class and get next id

const GetTasksbyColumn = (columnname) => {
  return dataset.filter((task) => task.column === columnname);
};
const getpriorityclass = (priority) => {
  if (priority === "low") return "low-priority";
  if (priority === "medium") return "medium-priority";
  return "high-priority";
};
const getnextid = () => {
  const ids = dataset.map((task) => task.id);
  return Math.max(...ids) + 1;
};

// dynamic task elements

function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.setAttribute("data-id", task.id);
  taskElement.innerHTML = `
    <h3>${task.priority}</h3>
    <p>${task.title}</p>
    <div class="tags">
      ${task.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <p>${task.date}</p>
    <button type="button" class="delete-button"><span><img src='assets/delete.svg'></span></button>
  `;
  return taskElement;
}

//render functions to create the board from the dataset
function renderBoard() {
  // Clear existing content
  board.innerHTML = "";
  todocolumn.innerHTML = "";
  inprogresscolumn.innerHTML = "";
  completedcolumn.innerHTML = "";

  // Render tasks for each column
  GetTasksbyColumn("todoList").forEach((task) => {
    const taskElement = createTaskElement(task);
    todocolumn.appendChild(taskElement);
  });
  board.appendChild(todocolumn);

  GetTasksbyColumn("inprogressList").forEach((task) => {
    const taskElement = createTaskElement(task);
    inprogresscolumn.appendChild(taskElement);
  });
  board.appendChild(inprogresscolumn);

  GetTasksbyColumn("completedList").forEach((task) => {
    const taskElement = createTaskElement(task);
    completedcolumn.appendChild(taskElement);
  });
  board.appendChild(completedcolumn);
}

// initial startup application
renderBoard();

//Delete Button
board.addEventListener("click", (e) => {
  const deletebtn = e.target.closest(".delete-button");
  if (deletebtn) {
    const taskElement = e.target.closest(".task");
    const taskId = parseInt(taskElement.getAttribute("data-id"));
    const taskIndex = dataset.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      dataset.splice(taskIndex, 1);
      renderBoard();
    }
  }
});
