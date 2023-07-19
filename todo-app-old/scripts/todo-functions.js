"use strict";

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (error) {
        return [];
    }
}

// Save todos to localStorage
const saveTodos = todos => localStorage.setItem("todos", JSON.stringify(todos));

// Render application based on filters
const renderTodos = (todos, filters) => {
    const todoElement = document.querySelector("#todos");
    let filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()));
    filteredTodos = filteredTodos.filter(todo => !filters.hideCompleted || !todo.completed);
    const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

    todoElement.innerHTML = "";
    todoElement.appendChild(generateSummaryDOM(incompleteTodos));

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => todoElement.appendChild(generateTodoDOM(todo)));
    } else {
        const messageElement = document.createElement('p');
        messageElement.classList.add('empty-message');
        messageElement.textContent = 'No to-dos to show';
        todoElement.appendChild(messageElement);
    }

}

// Remove todos bu id
const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) todos.splice(todoIndex, 1);
}

// Toggle the completed value for a given todo
const toggleTodo = id => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) todo.completed = !todo.completed;
}

// Get the DOM elements for an individual note
const generateTodoDOM = todo => {
    const todoElement = document.createElement("label");
    const containerElement = document.createElement("div");
    const todoCheckbox = document.createElement("input");
    const todoText = document.createElement("span");
    const removeButton = document.createElement("button");

    // Setup todo checkbox
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.checked = todo.completed;
    containerElement.appendChild(todoCheckbox);
    todoCheckbox.addEventListener("change", () => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    // Setup todo text content
    todoText.textContent = todo.text;
    containerElement.appendChild(todoText);

    // Setup container
    todoElement.classList.add('list-item');
    containerElement.classList.add('list-item__container');
    todoElement.appendChild(containerElement);

    // Setup the remove todo button
    removeButton.textContent = "remove";
    removeButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    return todoElement;
}

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
    const summary = document.createElement("h2");
    const plural = incompleteTodos.length === 1 ? '' : 's';
    summary.classList.add('list-title');
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary;
}