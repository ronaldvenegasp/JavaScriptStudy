const todos = [
  { text: "Order cat food", completed: false },
  { text: "Clean kitchen", completed: true },
  { text: "Buy food", completed: true },
  { text: "Do work", completed: false },
  { text: "Exercise", completed: true }
];

const sortTodos = function (todos) {
  todos.sort(function (a, b) {
    if (!a.completed && b.completed) {
      return -1;
    } else if (!b.completed && a.completed) {
      return 1;
    } else {
      return 0;
    }
  })
}

const findTodos = function (todos, query) {
  return todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(query.toLowerCase());
  });
}

const findCompletedTodos = function (todos) {
  return todos.filter(function (todo) {
    return !todo.completed;
  });
}

const deleteTodo = function (todos, todoText) {
  const index = todos.findIndex(function (todo) {
    return todo.text.toLowerCase() === todoText.toLowerCase();
  })
  if (index > -1) {
    todos.splice(index, 1);
  }
}

sortTodos(todos);
console.log("todos", todos);
console.log("filteredTodos", findTodos(todos, "cat"));
console.log("findCompletedTodos", findCompletedTodos(todos));
deleteTodo(todos, "Buy food");
console.log("todos", todos);

