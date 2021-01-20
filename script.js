// Query Selectors
let addNewTodoBtn = document.querySelector('.add-todo-btn');
let clearBtn = document.querySelector('.clear-btn');
let createNewTodoBox = document.querySelector('.create-new-todo');
let todoList = document.querySelector('.todo-list');
let checkBox = document.querySelector('.fa-check');
let trashCan = document.querySelector('.fa-trash');
let resetTodosBtn = document.querySelector('.reset-todo-list');
let todayDate = document.querySelector('.date');
let theTime = document.querySelector('.time');
let filterOptions = document.querySelector('.filter-list');

// Add New Todo Function

// Click

function addTodo(e) {
	// Prevent Default
	e.preventDefault();

	if (createNewTodoBox.value.trim()) {
		// Create New Elements and Update List

		// Create Div
		let div = document.createElement('div');
		div.classList.add('list-item-div');

		// Create Li
		let li = document.createElement('li');
		li.classList.add('list-item');
		li.innerText = createNewTodoBox.value.trim();

		// Create i
		let iCheck = document.createElement('i');
		let iTrash = document.createElement('i');
		iCheck.classList.add('fas');
		iCheck.classList.add('fa-check');
		iTrash.classList.add('fas');
		iTrash.classList.add('fa-trash');

		// Append Elements

		todoList.append(div);
		div.append(li);
		div.append(iCheck);
		div.append(iTrash);

		// Reset Box
		createNewTodoBox.value = '';
	}
}

// Enter Button

function addTodoSubmit(e) {
	if (e.keyCode == 13 && createNewTodoBox.value.trim()) {
		// Create Div
		let div = document.createElement('div');
		div.classList.add('list-item-div');

		// Create Li
		let li = document.createElement('li');
		li.classList.add('list-item');
		li.innerText = createNewTodoBox.value.trim();

		// Create i
		let iCheck = document.createElement('i');
		let iTrash = document.createElement('i');
		iCheck.classList.add('fas');
		iCheck.classList.add('fa-check');
		iTrash.classList.add('fas');
		iTrash.classList.add('fa-trash');

		// Append Elements

		todoList.append(div);
		div.append(li);
		div.append(iCheck);
		div.append(iTrash);

		// Reset Box
		createNewTodoBox.value = '';
	}
}

// Complete or Delete Todos
function completeOrRemoveTodo(e) {
	const todo = e.target;
	if (todo.matches('.fa-trash')) {
		todo.parentElement.classList.add('fall');
		todo.parentElement.style.background = 'rgb(235, 16, 16)';
		todo.parentElement.addEventListener('transitionend', function() {
			todo.parentElement.remove();
		});
	} else if (e.target.matches('.fa-check')) {
		todo.parentElement.children[0].classList.toggle('completed');
		todo.parentElement.classList.toggle('finished');
	}
}

// Reset Todos Btn
function resetTodoList() {
	todoList.classList.add('fall');
	todoList.addEventListener('transitionend', () => {
		todoList.innerHTML = '';
		todoList.classList.remove('fall');
	});
}

// Get Date and Time - Display in Browser

let date = new Date();
let day = date.getDay();

switch (day) {
	case 0:
		day = 'Sunday';
		break;
	case 1:
		day = 'Monday';
		break;
	case 2:
		day = 'Tuesday';
		break;
	case 3:
		day = 'Wednesday';
		break;
	case 4:
		day = 'Thursday';
		break;
	case 5:
		day = 'Friday';
		break;
	case 6:
		day = 'Saturday';
		break;
}

todayDate.innerText = `${day} ${date.getDate()}-${date.getMonth() +
	1}-${date.getFullYear()}`;

const tickingTimer = () => {
	const date = new Date();

	const h = date.getHours();

	const m = date.getMinutes();

	const s = date.getSeconds();

	theTime.innerText = `${h}: ${m}: ${s}`;

	if (h < 10) {
		theTime.innerText = `${h} : ${m} : ${s}`;
	}

	if (m < 10) {
		theTime.innerText = `${h} : 0${m} : ${s}`;
	}

	if (s < 10) {
		theTime.innerText = `${h} : ${m} : 0${s}`;
	}
};

setInterval(tickingTimer, 1000);

// Filter Todo Function

function filterTodo() {
	let todos = todoList.childNodes;
	todos.forEach(todo => {
		switch (filterOptions.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.firstChild.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (todo.firstChild.classList.contains('completed')) {
					todo.style.display = 'none';
				} else {
					todo.style.display = 'flex';
				}
				break;
		}
	});
}

//

// Event Listeners

filterOptions.addEventListener('change', filterTodo);

addNewTodoBtn.addEventListener('click', addTodo);

clearBtn.addEventListener('click', e => {
	e.preventDefault();
	createNewTodoBox.value = '';
});
document.addEventListener('click', completeOrRemoveTodo);

createNewTodoBox.addEventListener('keypress', addTodoSubmit);

resetTodosBtn.addEventListener('click', resetTodoList);
