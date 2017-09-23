var main = (function() {
	const todoForm = document.getElementById('add-form');
	const todoFormInput = document.querySelector('.add-form__input');
	const todoFormAddBtn = document.querySelector('.add-form__btn');
	const todoList = document.querySelector('.todo');
	const todoListItems = document.querySelectorAll('.todo__item');

	function createElement(tag, props, ...childs) {
		const element = document.createElement(tag);

		Object.keys(props).forEach(key => element[key] = props[key]);

		if(childs.length > 0) {
			childs.forEach(child => {
				if(typeof child === 'string') {
					child = document.createTextNode(child);
				}
				element.appendChild(child);
			});
		}

		return element;
	}

	function addTodoItem(event) {
		event.preventDefault();
		
		if(todoFormInput.value === '') {
			return alert('Input is empty');
		}

		const todoItem = createTodoItem(todoFormInput.value);

		todoList.appendChild(todoItem);

		todoFormInput.value = '';
		
	}

	function createTodoItem(title) {
		const checkbox = createElement('input', { type: 'checkbox', className: 'todo__checkbox'});
		const label = createElement('label', { className: 'todo__label' }, title);
		const editInput = createElement('input', {type: 'text', className: 'todo__input-text'});
		const editBtn = createElement('button', { className: 'btn todo__edit'}, 'Edit');
		const deleteBtn = createElement('button', { className: 'btn todo__delete' }, 'Delete');
		const item = createElement('li', { className: 'todo__item'}, checkbox, label,editInput, editBtn, deleteBtn);

		addEvent(item);

		return item;
	}

	function addEvent(item) {
		const checkbox = item.querySelector('.todo__checkbox');
		const editBtn = item.querySelector('.todo__edit');
		const deleteBtn = item.querySelector('.todo__delete');

		checkbox.addEventListener('change', toggleCheckbox);
		editBtn.addEventListener('click', editTodoItem);
		deleteBtn.addEventListener('click', deleteTodoItem);
	}

	function toggleCheckbox() {
		const thisParent = this.parentNode;
		thisParent.classList.toggle('todo__item--done');
	}

	function editTodoItem() {
		const thisParent = this.parentNode;
		const taskTitle = thisParent.querySelector('.todo__label');
		const textField = thisParent.querySelector('.todo__input-text');
		thisParent.classList.toggle('todo__item--editing');
		textField.classList.toggle('todo__input-text--active');
		const isEditing = thisParent.classList.contains('todo__item--editing');

		if(isEditing) {
			textField.value = taskTitle.innerText;
			this.innerText = 'Save';
		} else {
			taskTitle.innerText = textField.value;
			this.innerText = 'Edit';
		}
	}

	function deleteTodoItem() {
		const thisParent = this.parentNode;
		todoList.removeChild(thisParent);
	}

	function init() {
		todoForm.addEventListener('submit', addTodoItem);
		todoListItems.forEach(item => addEvent(item));
	}

	return init;
})(document);

main();